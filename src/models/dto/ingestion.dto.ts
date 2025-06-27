
export class ProcessIngestionDto{
    fileName:string;
    fileBuffer:Buffer;
    type:string;
    size:number;
}

export class UpdateIngestionStatusDto {
    reference:string;
    status:string;
}