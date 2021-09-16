import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { 
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    })
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if(!user){
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.password){
      updateUserDto = {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password,10)
      };    
    }
    const user = this.findOne(id) && await this.userRepository.preload({
      id:+id,
      ...updateUserDto
    });
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
