import { Injectable } from '@nestjs/common';
import { users } from 'src/moсks';

@Injectable()
export class UserService {
  getUsers() {
    return users;
  }
}
