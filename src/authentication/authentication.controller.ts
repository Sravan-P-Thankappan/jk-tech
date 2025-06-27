import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../models/dto/user.dto';
import { LoginDto } from '../models/dto/auth.dto';
import { Public } from '../constants/decorator';

@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService) { }


    @Public()
    @Post('signup')
    userSignUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.userSignup(createUserDto);
    }

    @Public()
    @Post('login')
    userLogin(@Body() loginDto: LoginDto) {
        console.log("loginDto",loginDto)
        return this.authService.userLogin(loginDto);
    }

    
}
