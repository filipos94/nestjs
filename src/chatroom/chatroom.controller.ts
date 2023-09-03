import {Body, Controller, Get, Post} from '@nestjs/common';
import {ChatroomDto} from "./chatroomUtils/chatroom.dto";
import {ChatroomService} from "./chatroom.service";

@Controller('chatroom')
export class ChatroomController {
    constructor(private readonly chatroomService: ChatroomService) {}

    @Post('new-message')
    async newMessage(@Body() chatroomDto: ChatroomDto){
        return this.chatroomService.newMessage(chatroomDto);
    }
    @Get('all-messages')
    async allMessages(){
        return this.chatroomService.allMessages();
    }
}
