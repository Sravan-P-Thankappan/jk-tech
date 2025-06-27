import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/entity/user.entity';
import * as bcrypt from 'bcrypt'

describe('UserService', () => {
  let userService: UserService;
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn()

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  // it('should be defined', () => {
  //   expect(provider).toBeDefined();
  // });

  describe('createUser', () => {
    const createUserDto = {
      name: 'sravan',
      email: 'sravan@gmail.com',
      password: '12345678',
      role: 'admin'
    }

    const User = {
      id: Date.now(),
      name: 'sravan',
      email: 'sravan@gmail.com',
      password: '12345678',
      role: 'admin'
    }

    const response = {
      message: "User created successfully",
      data: User
    }

    it('it encrypt the password', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'mockedHash');
      let hashedRes = await bcrypt.hash(createUserDto.password, 10);
      expect(hashSpy).toBeCalledWith(createUserDto.password, 10);
      expect(hashedRes).toBe('mockedHash')
    });

    it('it creates the user', async () => {
      const createUserObj = jest.spyOn(mockUserRepository, 'create').mockReturnValue(User);
      const createUser = jest.spyOn(mockUserRepository, 'save').mockReturnValue(User);

      const result = await userService.createUser(createUserDto)

      expect(createUserObj).toBeCalledWith(createUserDto);
      expect(createUser).toBeCalledWith(User);
      expect(result).toStrictEqual(response);

    });


  });

  describe('updateUser', () => {
    const updateUserDto = {
      name: 'sravan',
      email: 'sravan@gmail.com',
      password: '12345678',
      role: 'admin',
      status: 1
    }

    const User = {
      id: Date.now(),
      name: 'sravan',
      email: 'sravan@gmail.com',
      password: '12345678',
      role: 'admin'
    }

    const response = {
      message: "User updated successfully",
      data: User
    }

    it('it updates the user', async () => {
      const id = 1;
      const authUser = {
        id: 3,
        name: 'admin',
        role: 'admin'
      }
      const findUserBy = jest.spyOn(mockUserRepository, 'findOneBy').mockReturnValue(User);
      const updateUser = jest.spyOn(mockUserRepository, 'save').mockReturnValue(User);

      const result = await userService.updateUser(updateUserDto, id, authUser);
      expect(findUserBy).toBeCalledWith({ id });
      expect(result).toStrictEqual(response);

    });
  });

  describe('findUser', () => {
    const searchUserDto = {
      id: 1,
      email: 'sr@gmail.com',
      role: 'admin',
      status: 1
    }

    const User = {
      id: Date.now(),
      name: 'sravan',
      email: 'sr@gmail.com',
      password: '12345678',
      role: 'admin'
    }

    const response = {
      message: "User updated successfully",
      data: User
    }

    it('it find user', async () => {

      const findUserBy = jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(User);

      const result = await userService.findUser(searchUserDto);
      const where:any = Object.assign({}, searchUserDto) as any;
      where['status'] = searchUserDto.status.toString();
      expect(findUserBy).toBeCalledWith({where});
      expect(result).toStrictEqual(User);
    });
  });


});
