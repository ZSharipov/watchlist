import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const user = await this.userService.publicUser(dto.email);
    const token = await this.tokenService.generateJwtToken(user);
    return { ...user, token };
  }
}
