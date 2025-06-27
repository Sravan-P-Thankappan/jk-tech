import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../models/entity/user.entity';

describe('AuthenticationService', () => {
  let provider: AuthenticationService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn()

  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService,
        UserService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository
        }
      ],
    }).compile();

    provider = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
