
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "../enum/roles.enum";
import { Status } from "../enum/status.enum";

@Entity({name:'document'})
export class Document {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30})
    title: string;

    @Column({ type: 'mediumtext', nullable:true })
    description: string;

    @Column({ type: 'varchar', length:30 })
    fileName: string;

    @Column({ type: 'varchar', length:30 })
    fileType: string;

    @Column({ name: 'created_by', type: 'int', nullable: true })
    createdBy:number

    @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
    createdDate: Date;

    @Column({ name: 'updated_by', type: 'int', nullable: true })
    updatedBy:number;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
    updatedDate: Date;

}