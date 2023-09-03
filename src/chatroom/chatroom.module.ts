import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { Chatroom } from "./chatroomUtils/chatroom.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ChatroomController} from "./chatroom.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom])],
  providers: [ChatroomService],
  controllers: [ChatroomController]
})
export class ChatroomModule {}
