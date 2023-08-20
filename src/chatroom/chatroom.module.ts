import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';

@Module({
  providers: [ChatroomService],
})
export class ChatroomModule {}
