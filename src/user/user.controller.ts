import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '../models/dto/user.dto';
import { Request } from 'express';
import { Roles } from '../constants/decorator';
import { Roles as Role } from '../models/enum/roles.enum'
import { RolesGuard } from '../guard/role.guard';

@UseGuards(RolesGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('/')
    @Roles(Role.Admin)
    createUser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
        return this.userService.createUser(createUserDto, req.user);

    }

    @Patch('/:id')
    @Roles(Role.Admin)
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string, @Req() req: Request) {
        return this.userService.updateUser(updateUserDto, +id, req.user);
    }

    @Get('/')
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}
