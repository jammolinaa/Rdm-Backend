// condition.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('conditions')
export class Condition {
  @PrimaryGeneratedColumn()
  condition_id: number;

  @Column()
  name: string;

  @Column()
  description: string; 
}
