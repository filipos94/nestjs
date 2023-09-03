import {Injectable} from '@nestjs/common';
import {Chatroom} from "./chatroomUtils/chatroom.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChatroomDto} from "./chatroomUtils/chatroom.dto";

@Injectable()
export class ChatroomService {
    constructor(@InjectRepository(Chatroom) private readonly chatroomRepository: Repository<Chatroom>) {}

    async newMessage(chatroomDto: ChatroomDto): Promise<Chatroom>{
        const message = this.chatroomRepository.create(chatroomDto);
        return this.chatroomRepository.save(message);
    }

    async allMessages(){
        const allMessages = this.chatroomRepository.find();
        console.log(allMessages)
        return allMessages;
    }
}
