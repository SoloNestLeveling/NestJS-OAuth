import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseModel {

    @PrimaryGeneratedColumn()
    id: number;


    @CreateDateColumn()
    createdAt: Date;
}