import { Entity } from 'typeorm';

@Entity()
export class chatroomEntity {
  username: string;

  message: string;
}
