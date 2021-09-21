import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    async validateUser(username: string, password: string) : Promise<any> {
        const user = await this.usersRepository.findOne(username);
        if(user && await bcrypt.compare(password, (await user).password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
