import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Connection} from "typeorm";
import {Book} from "./Books";

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bookName: string;

    @ManyToMany(type => Book, book => book.authors)
    @JoinTable()
    books: Book[];

}
