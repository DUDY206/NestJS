import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, user => user.comments)
    user:User;
}
