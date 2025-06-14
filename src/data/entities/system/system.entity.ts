import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('system')
export class System {
  @PrimaryGeneratedColumn()
  system_id: number;

  @Column()
  name: string;
}
