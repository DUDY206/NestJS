import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    async validateUser(username: string, password: string) : Promise<any> {
        const user = await this.usersRepository.findOne(username);
        if(user && await bcrypt.compare(password, (await user).password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any){
        const payload = { username: user.username, id: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
