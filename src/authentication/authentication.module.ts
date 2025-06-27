import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwt_secret } from '../constants/constants';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwt_secret,
      signOptions: { expiresIn: '600s' }
    })
  ]
})
export class AuthenticationModule { }
