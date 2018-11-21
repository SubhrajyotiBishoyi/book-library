import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import {Author} from "./Authors";
import {Registry} from "./Registry";
import {User} from "./Users";

@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    authorName: string;

    @Column()
    availability: boolean;

    @ManyToMany(type => Author, author => author.books)
    authors: Author[];

    @ManyToMany(type => User, user => user.books)
    users: User[];
}
