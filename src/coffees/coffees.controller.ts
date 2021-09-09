import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
    constructor(
        //private ---> shorthand create a property
        private readonly coffeesService: CoffeesService
    ){}
    // @Get('flavors') => backend.test.com/coffees/flavors

    @Get()
    // findAll(@Res() res){
    findAll(@Query() pagniationQuery){
        return this.coffeesService.findAll();
    }

    @Get(':id')
    // findOne(@Param() params){
    findOne(@Param('id') id: string){
        return this.coffeesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body){
        return this.coffeesService.create(body);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body()  body){
        return this.coffeesService.update(id, body);    
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return this.coffeesService.remove(id);
    }
}
