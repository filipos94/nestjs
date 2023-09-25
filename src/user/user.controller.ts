import {Controller, Get, Post, Delete, Put, Body, Param, Res, Req} from '@nestjs/common';
import { UsersDto } from './usersUtils/usersDto';
import { UserService } from './user.service';
import { Response, Request } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all-users')
  async allUsers() {
    return this.userService.allUsers();
  }

  @Post('new-users')
  async newUsers(@Body() usersDto: UsersDto, @Res({passthrough: true}) response: Response) {
    await response.cookie('jwt', this.userService.newUser(usersDto))
    return usersDto
  }

  @Post('userLogin')
  async userLogin(@Body() usersDto: UsersDto, @Res({passthrough: true}) response: Response) {
    response.cookie('jwt', await this.userService.userLogin(usersDto))
    return usersDto
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

  @Get('userValidation')
  async userValidation(@Req() req: Request) {
    const cookie = req.cookies['jwt']
    return this.userService.userValidation(cookie)
  }

  @Get('logout')
  logOut(@Res() res){

  }
}
