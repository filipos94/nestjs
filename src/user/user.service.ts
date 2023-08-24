import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './usersUtils/users.entity';
import { Repository } from 'typeorm';
import { UsersDto } from './usersUtils/usersDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async allUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async newUser(usersDto: UsersDto): Promise<User> {
    const user = this.userRepository.create(usersDto);
    return this.userRepository.save(user);
  }

  async userLogin(usersDto: UsersDto): Promise<void> {
    const userCheck = this.userRepository.find({
      where: {username: usersDto.username}
    });
    console.log(userCheck);
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
}
