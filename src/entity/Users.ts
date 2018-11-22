import {Entity, PrimaryGeneratedColumn, Column, ManyToMany,JoinTable} from "typeorm";
import { Registry } from "./Registry";
import {Book} from "./Books";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNo: number;

    @Column()
    photo: string;

    @Column()
    isAdmin: boolean;

    @ManyToMany(type => Book, book => book.users)
    @JoinTable({
        name: ""
    })
    books: Book[];
}