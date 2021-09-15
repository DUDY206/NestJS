import { IsEmail } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/comments/entities/comment.entity";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];
}
