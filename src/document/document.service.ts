import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from '../models/entity/document.entity';
import { Repository } from 'typeorm';
import { UpdateDocumentDto, UploadDocumentDto } from '../models/dto/document.dto';
import { AuthUser, Response } from '../models/types/types';
import { Messages } from '../models/enum/messages.enum';

@Injectable()
export class DocumentService {

    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>
    ) { }

    async UploadDocument(uploadDocumentDto: UploadDocumentDto, authUser: AuthUser): Promise<Response> {
        const newDocument = this.documentRepository.create(uploadDocumentDto);
        newDocument.createdBy = authUser.id;
        const document = await this.documentRepository.save(newDocument);
        return {
            message: Messages.DOCUMENT_UPLOADED,
            data: document
        }
    }

    async listDocument(): Promise<Response> {
        const documents = await this.documentRepository.find();
        return {
            message: Messages.DOCUMENT_RETRIVED,
            data: documents
        }
    }

    async udpateDocument(updateDocumentDto: UpdateDocumentDto, id: number, authUser: AuthUser) {

        let document = await this.documentRepository.findOneBy({ id });
        if (!document) {
            throw new NotFoundException('Document not found');
        }
        document = Object.assign(document, { ...updateDocumentDto, updatedBy: authUser.id });
        document = await this.documentRepository.save(document);
        return {
            message: Messages.DOCUMENT_UPDATED,
            data: document
        }
    }

}
