import {Entity, PrimaryGeneratedColumn, Column, JoinColumn} from "typeorm";
import {Book} from "./Books";
import { User } from "./Users";

@Entity()
export class Registry {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinColumn()
    userId: number;

    @JoinColumn()
    bookId: number;

    @Column()
    lendDt: Date;

    @Column()
    returnDt: Date;
}
