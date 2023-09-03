import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;
}
