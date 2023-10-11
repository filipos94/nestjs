import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from "./chatroomUtils/chatroom.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ChatroomController} from "./chatroom.controller";
import {JwtModule} from "@nestjs/jwt";
import {User} from "../user/usersUtils/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom, User]),
    JwtModule.register({
      secret: 'key', // Replace with your actual secret key
      signOptions: {expiresIn: '1h'}
    })],
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
