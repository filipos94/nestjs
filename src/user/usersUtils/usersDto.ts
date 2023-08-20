import { isString, isNotEmpty } from 'class-validator';

export class UsersDto {
  username: string;
  password: string;
  email: string;
}
