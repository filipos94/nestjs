import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {User} from "../../user/usersUtils/users.entity";

@Entity()
export class Chatroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  date: string

  @BeforeUpdate()
  @BeforeInsert()
  updateCurrentDate(){
    this.date = new Date().toUTCString();
  }

  @OneToOne(() => User, (user) => user.message)
  user: User;

}
