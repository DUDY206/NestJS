import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController{

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
        async login(@Request() req){
        console.log("hello");
        return req.user;
    }
}