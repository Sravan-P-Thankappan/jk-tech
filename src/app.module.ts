import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DocumentModule } from './document/document.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    UserModule,
    AuthenticationModule,
    DocumentModule,
    IngestionModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [join(__dirname, './models/entity/*.entity{.ts,.js}')],
      logging: true,
      synchronize: true
    })
  ],
})
export class AppModule { }
