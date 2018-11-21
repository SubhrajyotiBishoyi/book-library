import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
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

    @OneToMany(type => Book, book => book.registry)
    books: Book[];

    @OneToMany(Type => User, user => user.registry)
    users: User[];

}
