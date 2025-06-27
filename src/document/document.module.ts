import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../models/entity/document.entity';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService],
  imports:[TypeOrmModule.forFeature([Document])]
})
export class DocumentModule {}
