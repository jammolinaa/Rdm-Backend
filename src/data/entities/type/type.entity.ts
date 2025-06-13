import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('type')

export class Type {

    @PrimaryGeneratedColumn()
    type_id: number;

    @Column()
    name: string;

}
