import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsUserAlreadyExist } from "../validations/is-user-already-exist-constraint";

export class CreateUserDto {
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another name.'
    })
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    // regex validator still not working well
    // https://github.com/typestack/class-validator/issues/484
    // @Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+)+/g)
    password: string;

    @IsEmail()
    email: string;

    
}
