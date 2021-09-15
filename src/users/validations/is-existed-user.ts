import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

@ValidatorConstraint({async: true})
export class IsExistedUserConstraint implements ValidatorConstraintInterface{
    private userRepository;

    constructor(){
        this.userRepository = getRepository(User);
    }

    async validate(id: number, args: ValidationArguments){
        const user = await this.userRepository.findOne(id);
        if(!user) return false;
        return true;
    }
}

export function IsExistedUser(validationOptions ?: ValidationOptions){
    return function (object: Object, propertyName: string){
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsExistedUserConstraint
        })
    }
}