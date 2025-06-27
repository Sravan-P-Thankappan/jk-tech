import { Observable } from "rxjs";

export interface ProcessIngestionReq {
    filename: string;
    fileBuffer: Buffer;
    reference: string;
}

export interface ManageIngestionReq {
    reference: string;
}

export interface Response {
    message: string;
}

export interface IngestionServiceClient {
    ProcessIngestion(request: ProcessIngestionReq): Observable<Response>;
    ManageIngestion(request: ManageIngestionReq): Observable<Response>;
}