import { IsEmail, IsIn, IsNotEmpty } from "class-validator";
import { Roles } from "../enum/roles.enum";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;  

    @IsNotEmpty()
    @IsIn(Object.values(Roles))
    role: string;
}

export class UpdateUserDto {
    name: string;
    email: string;
    password: string;
    status: number;
    role: string;
}

export class SearchUserDto{
    id:number;
    email:string;
    role:string;
    status:number
}

