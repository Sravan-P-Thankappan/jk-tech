import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IngestionServiceClient, ProcessIngestionReq } from '../interface/ingestion.service';
import { ClientGrpc } from '@nestjs/microservices';
import { ProcessIngestionDto, UpdateIngestionStatusDto } from '../models/dto/ingestion.dto';
import { firstValueFrom, timeout } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingestion } from '../models/entity/ingestion.entity';
import { Repository } from 'typeorm';
import { IngestionStatus } from '../models/enum/status.enum';
import { Response } from '../models/types/types';
import { Messages } from '../models/enum/messages.enum';



@Injectable()
export class IngestionService {
    private ingestionService: IngestionServiceClient
    constructor(
        @Inject('INGESTION_PACKAGE')
        private client: ClientGrpc,
        @InjectRepository(Ingestion)
        private ingestionRepository: Repository<Ingestion>
    ) { }

    onModuleInit() {
        this.ingestionService = this.client.getService<IngestionServiceClient>('IngestionService');
    }

    async processIngestion(processIngestionDto: ProcessIngestionDto): Promise<Response> {
        const reference = Date.now().toString();
        const processIngestion: ProcessIngestionReq = {
            filename: processIngestionDto.fileName,
            fileBuffer: processIngestionDto.fileBuffer,
            reference
        }

        //---------- this is demo microservice call using gRPC----------------
        let demoMicroserviceCall = true;
        if (!demoMicroserviceCall) await firstValueFrom(this.ingestionService.ProcessIngestion(processIngestion));

        const ingestion = this.ingestionRepository.create();
        ingestion.fileName = processIngestionDto.fileName;
        ingestion.type = processIngestionDto.type;
        ingestion.size = processIngestionDto.size;
        ingestion.reference = reference;
        ingestion.status = IngestionStatus.Processing;
        const result = await this.ingestionRepository.save(ingestion);
        return {
            message: Messages.INGESTION_PROCESSING,
            data: result
        }

    }

    async listIngestion(): Promise<Response>{
        const ingestion = await this.ingestionRepository.find();
        return {
            message:Messages.INGESTION_RETRIVED,
            data:ingestion
        }
    }

    async updateIngestionStatus(udpateStatusDto: UpdateIngestionStatusDto): Promise<Response> {
        let ingestion = await this.ingestionRepository.findBy({ reference: udpateStatusDto.reference });
        if (!ingestion) {
            throw new NotFoundException('No data found');
        }
        ingestion = Object.assign(ingestion, udpateStatusDto);
        ingestion = await this.ingestionRepository.save(ingestion);
        return {
            message: Messages.INGESTION_UPDATED,
            data: ingestion
        }
    }
}
