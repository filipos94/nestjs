import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomController } from './chatroom/chatroom.controller';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [__dirname + '/user/usersUtils/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    ChatroomModule,
  ],
  controllers: [AppController, ChatroomController],
  providers: [AppService, UserModule],
})
export class AppModule {}
