import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {Chatroom} from "../../chatroom/chatroomUtils/chatroom.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToOne(() => Chatroom, {cascade: true})
  @JoinColumn()
  message:Chatroom;
}
