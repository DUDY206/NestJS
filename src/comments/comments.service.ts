import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import * as date from 'date-and-time'

@Injectable()
export class CommentsService {
  
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findOne(createCommentDto.userId);
    const comment = await this.commentRepository.create({
      ...createCommentDto,
      user,
      created_at: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
    });
    return this.commentRepository.save(comment);
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne(id,{
      relations: ['user'],
    });
    if(!comment){
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.findOne(id) && await this.commentRepository.preload({
      id:+id,
      ...updateCommentDto
    });
    return await this.commentRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    return await this.commentRepository.remove(comment);
  }
}
