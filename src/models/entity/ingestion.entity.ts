

import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "../enum/roles.enum";
import { IngestionStatus, Status } from "../enum/status.enum";

@Entity({ name: 'ingestion' })
export class Ingestion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    fileName: string;

    @Column({ type: 'varchar', length: 30 })
    type: string;

    @Column({ type: 'int' })
    size: number;

    @Column({ type: 'enum', enum: IngestionStatus })
    status: string;

    @Column({ type: 'varchar', length: 50 })
    reference: string;

    @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
    updatedDate: Date;

}