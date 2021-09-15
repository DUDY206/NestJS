import { IsNumber, IsString } from "class-validator";
import { IsExistedUser } from "src/users/validations/is-existed-user";

export class CreateCommentDto {
    @IsString()
    readonly content: string;

    @IsNumber()
    @IsExistedUser({
        message : 'user $value not existed'
    })
    userId: number;
}
