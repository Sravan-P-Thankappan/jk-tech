import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, SearchUserDto, UpdateUserDto } from '../models/dto/user.dto';
import { User } from '../models/entity/user.entity';
import { Messages } from '../models/enum/messages.enum';
import { AuthUser, Response } from '../models/types/types';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { saltOrRounds } from '../constants/constants';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async createUser(createUserDto: CreateUserDto, authUser?: AuthUser): Promise<Response> {

        // ---hasing password
        createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
        const newUser = this.userRepository.create(createUserDto);
        newUser.createdBy = authUser?.id;
        const result = await this.userRepository.save(newUser);
        return {
            message: Messages.USER_CREATED,
            data: result
        }
    }

    async updateUser(updateUserDto: UpdateUserDto, id: number, authUser: AuthUser): Promise<Response> {
        let user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user = Object.assign(user, { ...updateUserDto, updatedBy: authUser.id });

        const result = await this.userRepository.save(user);
        return {
            message: Messages.USER_UPDATED,
            data: result
        }
    }

    async findUser(searchUser: SearchUserDto): Promise<User> {
        const where = {} as any;
        Object.assign(where, searchUser);
        if (searchUser.status) where['status'] = searchUser.status.toString();
        const user = await this.userRepository.findOne({ where });
        console.log("user==>",user)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getAllUsers():Promise<any>{
        const users = await this.userRepository.find();
        return {
            message:Messages.USER_RETRIVED,
            data:users
        }
    }
}
