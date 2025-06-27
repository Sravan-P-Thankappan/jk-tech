import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IngestionService } from './ingestion.service';
import { Public } from '../constants/decorator';
import { UpdateIngestionStatusDto } from '../models/dto/ingestion.dto';

@Controller('ingestion')
export class IngestionController {

    constructor(
        private ingestionService: IngestionService
    ) { }

    @Post('process')
    @UseInterceptors(FileInterceptor('file'))
    processIngestion(@UploadedFile() file: Express.Multer.File) {
        const { originalname: fileName, buffer: fileBuffer, mimetype: type, size } = file;
        return this.ingestionService.processIngestion({ fileName, fileBuffer, type, size });
    }

    @Get('list')
    listIngestion(){
        return this.ingestionService.listIngestion();
    }

    //--------webhook api ----------
    @Public()
    @Post('/update/status')
    updateIngestionStatus(@Body() udpateStatusDto: UpdateIngestionStatusDto) {
        this.ingestionService.updateIngestionStatus(udpateStatusDto)
    }
}
