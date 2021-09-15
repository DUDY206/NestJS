import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // type of our database
      host: 'mysql', // database host
      port: 3306, // database host
      username: 'dudy206', // username
      password: 'abcdef123', // user password
      database: 'nestjs', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically 
      synchronize: true, // your
    }),
    CoffeesModule,
    UsersModule
  ],
  controllers: [AppController, ],
  providers: [AppService],
})
export class AppModule {}
