import {Injectable} from '@nestjs/common';
import {Chatroom} from "./chatroomUtils/chatroom.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ChatroomDto} from "./chatroomUtils/chatroom.dto";
import {User} from "../user/usersUtils/users.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class ChatroomService {
    constructor(@InjectRepository(Chatroom) private readonly chatroomRepository: Repository<Chatroom>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService) {}

    async newMessage(chatroomDto: ChatroomDto, cookie): Promise<Chatroom>{
        const message = this.chatroomRepository.create(chatroomDto);
        message.userID = await this.userID(cookie)
        return this.chatroomRepository.save(message);
    }

    async allMessages(){
        const allMessages = this.chatroomRepository.find();
        console.log(allMessages);
        return allMessages;
    }

    async userID(req){
        const data = await this.jwtService.verifyAsync(req)
        const user = await this.userRepository.findOneBy({
            username: data.username
        })
        return user.username
    }
}
