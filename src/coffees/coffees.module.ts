import { Module, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import coffeeConfig from './config/coffee.config';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([Coffee, Flavor, Event]),
        ConfigModule.forFeature(coffeeConfig),
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (connection: Connection) : Promise<string[]> =>{
                //const coffeeBrands = await connection.query("SELECT * FROM ...")
                const coffeeBrands = await Promise.resolve(['247', 'Wake up']);
                console.log('[!] Async Factory');
                return coffeeBrands;
            },
            scope: Scope.TRANSIENT,
            inject: [Connection] 
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
