import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Book} from "./Books";
import { User } from "./Users";

@Entity()
export class Registry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lendDt: Date;

    @Column()
    returnDt: Date;

    @Column()   
    userId: number

    @Column()
    bookId: number

    @OneToMany(type => Book, book => book.registry)
    books: Book[];
    
    @OneToMany(type => User, user => user.registry)
    users: User[];
}
