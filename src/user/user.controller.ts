import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { UsersDto } from './usersUtils/usersDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all-users')
  async allUsers() {
    return this.userService.allUsers();
  }

  @Post('new-users')
  async newUsers(@Body() usersDto: UsersDto) {
    return this.userService.newUser(usersDto);
  }

  @Put('update-users')
  async updateUsers(@Param('id') id: number, @Body() updateDto: UsersDto) {
    const user = await this.userService.updateUser(id, updateDto);
    if (!user) {
      return false;
    }
    return user;
  }

  @Delete('delete-users')
  async deleteUsers(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
