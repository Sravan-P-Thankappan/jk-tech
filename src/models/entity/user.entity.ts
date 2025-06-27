import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "../enum/roles.enum";
import { Status } from "../enum/status.enum";

@Entity({name:'user'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: '30', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: Status, default: Status.Active })
    status: number;

    @Column({ type: 'enum', enum: Roles })
    role: string;

    @Column({ name: 'created_by', type: 'int', nullable: true })
    createdBy

    @CreateDateColumn({ name: 'created_date', type: 'timestamp' })
    createdDate: Date;

    @Column({ name: 'updated_by', type: 'int', nullable: true })
    updatedBy

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamp' })
    updatedDate: Date;

    @Column({ name: 'deleted_by', type: 'int', nullable: true })
    deletedBy

    @DeleteDateColumn({ name: 'deleted_date', type: 'timestamp' })
    deletedDate: Date;

}