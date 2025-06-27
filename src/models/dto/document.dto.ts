import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UploadDocumentDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    description: string;

    fileName: string;

    fileType: string;
}

export class UpdateDocumentDto {
    title: string;
    description: string;
    fileName: string;
    fileType: string;
}