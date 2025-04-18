import { Body, Controller, Delete, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt_guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateUser(
    @Body() updateUserDTO: UpdateUserDTO,
    @Req() req,
  ): Promise<UpdateUserDTO> {
    const user = req.user;
    return this.userService.updateUser(user.email, updateUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Req() req){
    const user = req.user;
    return this.userService.deleteUser(user.email)
  }
}
