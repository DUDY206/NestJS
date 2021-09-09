import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    
    // @Get('flavors') => backend.test.com/coffees/flavors

    @Get()
    // findAll(@Res() res){
    findAll(@Query() pagniationQuery){
        // return 'this action return all coffees';
        
        // res.status(200).send('This action return all coffees');

        const {limit, offset} = pagniationQuery;
        return `This action return all coffees. Limit ${limit}, offset ${offset}`;
    }

    @Get(':id')
    // findOne(@Param() params){
    findOne(@Param('id') id: string){
        return `This actions returns #${id} coffees`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body){
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body()  body){
        return `This action update #${id} coffees`;        
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return `This action remove #${id} coffees`;
    }
}
