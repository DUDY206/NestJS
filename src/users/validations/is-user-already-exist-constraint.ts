import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

@ValidatorConstraint({async: true})
export class IsUserAlreadyExistConstraint implements ValidatorConstraintInterface{
    private userRepository;
    constructor() { 
        // this.userRepository = getCustomRepository(UserRepository);
        this.userRepository = getRepository(User)
    }
    
    async validate(username: string, args: ValidationArguments){
        const user = await this.userRepository.findOne({username});
        if(user) return false;
        return true;
    }
}

export function IsUserAlreadyExist(validationOptions ?: ValidationOptions){
    return function (object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsUserAlreadyExistConstraint
        });
    };
}
