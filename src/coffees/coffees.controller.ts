import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Res, SetMetadata } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorators';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { resolve } from 'url';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(
        //private ---> shorthand create a property
        private readonly coffeesService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request
    ){
        // console.log('CofeesController created');
    }
    // @Get('flavors') => backend.test.com/coffees/flavors

    @Public()
    @Get()
    // findAll(@Res() res){
    async findAll(@Query() pagniationQuery : PaginationQueryDto){
        await new Promise(resolve => setTimeout(resolve, 5000));
        return this.coffeesService.findAll(pagniationQuery);
    }

    @Get(':id')
    // findOne(@Param() params){
    findOne(@Param('id') id: string){
        // console.log(id);
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
