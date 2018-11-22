import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {Book} from "./Books";
import { User } from "./Users";

@Entity()
export class Registry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    bookId: number;

    @Column()
    lendDt: Date;

    @Column()
    returnDt: Date;
}
