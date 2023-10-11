import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {ChatroomDto} from "./chatroomUtils/chatroom.dto";
import {ChatroomService} from "./chatroom.service";
import {Request} from "express";
import {Chatroom} from "./chatroomUtils/chatroom.entity";

@Controller('chatroom')
export class ChatroomController {
    constructor(private readonly chatroomService: ChatroomService) {}

    @Post('new-message')
    async newMessage(@Body() chatroomDto: ChatroomDto, @Req() request: Request){
        const cookie = request.cookies['jwt']
        return this.chatroomService.newMessage(chatroomDto, cookie);
    }
    @Get('all-messages')
    async allMessages(){
        return this.chatroomService.allMessages();
    }
}
