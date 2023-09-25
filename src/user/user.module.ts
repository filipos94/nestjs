import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './usersUtils/users.entity';
import { UserController } from './user.controller';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'key', // Replace with your actual secret key
    })],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
