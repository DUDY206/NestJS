import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

class ConfigServices{}
class DevelopmentConfigService {}
class ProductConfigService {}

@Module({
    imports:[
        TypeOrmModule.forFeature([Coffee, Flavor, Event])
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: ConfigServices,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductConfigService,
        },
        {
            provide: COFFEE_BRANDS,
            useValue: ['247', 'Wake up']
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
