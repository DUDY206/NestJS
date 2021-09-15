import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(
        //private ---> shorthand create a property
        private readonly coffeesService: CoffeesService
    ){}
    // @Get('flavors') => backend.test.com/coffees/flavors

    @Get()
    // findAll(@Res() res){
    findAll(@Query() pagniationQuery : PaginationQueryDto){
        return this.coffeesService.findAll(pagniationQuery);
    }

    @Get(':id')
    // findOne(@Param() params){
    findOne(@Param('id') id: string){
        return this.coffeesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() createCoffeeDto: CreateCoffeeDto){
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto){
        return this.coffeesService.update(id, updateCoffeeDto);    
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return this.coffeesService.remove(id);
    }
}
