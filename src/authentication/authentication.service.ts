import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../models/dto/auth.dto';
import { CreateUserDto, SearchUserDto } from '../models/dto/user.dto';
import { Response } from '../models/types/types';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Messages } from '../models/enum/messages.enum';


@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async userSignup(createUserDto: CreateUserDto): Promise<Response> {
        const result: Response = await this.userService.createUser(createUserDto);
        return {
            message: Messages.SIGNUP_SUCESS,
            data: result.data
        }
    }

    async userLogin(loginDto: LoginDto): Promise<Response> {
        const searchUserBy = {} as SearchUserDto;
        searchUserBy.email = loginDto.email;
        console.log("search",searchUserBy)
        const user = await this.userService.findUser(searchUserBy);

        // checking password
        const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordMatch) throw new BadRequestException('Incorrect password');

        // generating token
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        }
        const custom_token = await this.jwtService.signAsync(payload);

        return {
            message: Messages.LOGIN_SUCESS,
            data: {
                custom_token,
                ...user
            }
        }

    }
}
