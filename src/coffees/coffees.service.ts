import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Injectable(
    { scope: Scope.REQUEST}
)
export class CoffeesService {
    
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository : Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository : Repository<Flavor>,
        private readonly connection: Connection,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    ){
        console.log('CoffeeService instantiated')        
    }

    async findAll(pagniationQuery : PaginationQueryDto){
        const {limit, offset} = pagniationQuery;
        return await this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne(id,{
            relations: ['flavors'],
        });
        if(!coffee){
            // throw new HttpException(`Coffee #${id} not found `, HttpStatus.NOT_FOUND );
            throw new NotFoundException(`Coffee #${id} not found `);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const flavors = await Promise.all(
                createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
            )
            const coffee = await this.coffeeRepository.create({
                ...createCoffeeDto,
                flavors
            });

            await queryRunner.manager.save(coffee);
            // throw new BadRequestException("check");
            await queryRunner.commitTransaction();
            return coffee;
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new BadRequestException("Cannot create new coffee try later");
        }finally{
            await queryRunner.release();
        }
        
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
        const flavors = updateCoffeeDto.flavors &&
        (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        ));

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    async recommenCoffee(coffee: Coffee){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            coffee.recommendation++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_cofee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = { coffeeId: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        }catch(err){
            await queryRunner.rollbackTransaction();
        }finally{
            await queryRunner.release();
        }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor>{
        const existingFlavor = await this.flavorRepository.findOne({name});
        if(existingFlavor){
            return existingFlavor;
        }
        return this.flavorRepository.create({name});

    }
}
