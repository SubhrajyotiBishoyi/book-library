import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Registry } from "./Registry";

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

    @ManyToOne(type => Registry, registry => registry.users)
    registry: Registry;

}