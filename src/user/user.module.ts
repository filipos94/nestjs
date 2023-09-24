import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './usersUtils/users.entity';
import { UserController } from './user.controller';
import {JwtModule, JwtService} from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    })],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
