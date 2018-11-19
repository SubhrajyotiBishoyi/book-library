import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Registry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    phoneNo: number;

    @Column()
    lendDt: Date;

    @Column()
    returnDt: Date;

}
