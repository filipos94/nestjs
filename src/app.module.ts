import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomModule } from './chatroom/chatroom.module';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    ChatroomModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [__dirname + '/user/usersUtils/*.entity{.ts,.js}',
        __dirname + '/chatroom/chatroomUtils/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
