import { Body, Controller, Get, Param, Patch, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { diskStorage } from 'multer';
import { UpdateDocumentDto, UploadDocumentDto } from '../models/dto/document.dto';
import { Request, Response } from 'express';
import { join } from 'path';
import { RolesGuard } from '../guard/role.guard';
import { Roles } from '../constants/decorator';
import { Roles as Role } from '../models/enum/roles.enum'
import { existsSync } from 'fs';


@UseGuards(RolesGuard)
@Controller('document')
export class DocumentController {

    constructor(
        private documentService: DocumentService
    ) { }

    @Roles(Role.Admin, Role.Editor)
    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname}`);
                },
            }),
        }),)
    uploadDocument(@Body() uploadDocumentDto: UploadDocumentDto, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        uploadDocumentDto.fileName = file.filename;
        uploadDocumentDto.fileType = file.mimetype;
        return this.documentService.UploadDocument(uploadDocumentDto, req.user);
    }

    @Get('/list')
    listDocument() {
        return this.documentService.listDocument();
    }

    @Get('download/:filename')
    downloadFile(@Param('filename') filename: string, @Res() res: Response) {

        const filePath = join(__dirname, '..', '..', 'uploads', filename);
        const fileExist = existsSync(filePath)
        if (!fileExist) return res.send({ message: "No such file exist" })
        return res.download(filePath);

    }

    @Roles(Role.Admin, Role.Editor)
    @Patch('/update/:id')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname}`);
                },
            }),
        }),)
    updateDocument(@Body() updateDocumentDto: UpdateDocumentDto, @UploadedFile() file: Express.Multer.File, @Param('id') id: string, @Req() req: Request) {
        if (file) {
            updateDocumentDto.fileName = file.filename;
            updateDocumentDto.fileType = file.mimetype;
        }
        return this.documentService.udpateDocument(updateDocumentDto, +id, req.user);
    }

}
