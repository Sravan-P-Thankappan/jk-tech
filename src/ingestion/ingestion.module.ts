import { Module } from '@nestjs/common';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingestion } from '../models/entity/ingestion.entity';

@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
imports: [
  TypeOrmModule.forFeature([Ingestion]),
  ClientsModule.register([
    {
      name: 'INGESTION_PACKAGE',
      transport: Transport.GRPC,
      options: {
        package: 'ingestion',
        protoPath: join(__dirname, '../proto/ingestion.proto'),
        url:"" // give the actual url
      },
    },
  ]),
]
})
export class IngestionModule {}
