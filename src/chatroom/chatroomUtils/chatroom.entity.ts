import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity, JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {ChatroomService} from "../chatroom.service";

@Entity()
export class Chatroom {
  constructor(private chatroomService: ChatroomService) {
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: string;

  @Column()
  userID: string;

  @BeforeUpdate()
  @BeforeInsert()
  updateCurrentDate(){
    this.date = new Date().toUTCString();
  }
}
