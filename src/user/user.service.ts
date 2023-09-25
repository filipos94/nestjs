import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './usersUtils/users.entity';
import {Repository} from 'typeorm';
import {UsersDto} from './usersUtils/usersDto';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) {}

  async allUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async newUser(usersDto: UsersDto){
    const user = this.userRepository.create(usersDto);
    const payload = {
      username: usersDto.username
    }
    await this.userRepository.save(user);
    const jwt = this.jwtService.signAsync(payload)
    return jwt;
  }

  async userLogin(usersDto: UsersDto) {
    const userCheck = await this.userRepository.findOneBy({
      username: usersDto.username,
      password: usersDto.password
    })
    const payload = {
      username: usersDto.username
    }
    if (!userCheck) return false
    return this.jwtService.signAsync(payload.username)
  }

  async updateUser(id: number, updateUserDto: UsersDto): Promise<User> {
    const options = { where: { id } };
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw NotFoundException;
    } else {
      user.username = updateUserDto.username;
      user.password = updateUserDto.password;
      user.email = updateUserDto.email;
    }
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async userValidation(req){
    const cookie = await this.jwtService.verifyAsync(req)
    const user = await this.userRepository.findOneBy({
      username: cookie
    })
    if (!user) {
      console.error("No user")
    } else {
      delete user.password;
      delete user.email;
      return user;
    }
  }

}
