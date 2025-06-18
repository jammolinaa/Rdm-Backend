import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alert } from "../alerts/alert.entity";

@Entity('conditions')
export class Condition {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  condition_id: number;

  @Column()
  name: string;

  @Column()
  description: string; 

  @OneToMany(() => Alert, (alert) => alert.condition, { onDelete: 'CASCADE' })
  aler: Array<Alert>;
}
