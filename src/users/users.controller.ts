import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') usernameOrEmail: string) {
    return this.usersService.findOne(usernameOrEmail);
  }

  @Patch(':usernameOrEmail')
  update(@Param('usernameOrEmail') usernameOrEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(usernameOrEmail, updateUserDto);
  }

  @Delete(':usernameOrEmail')
  remove(@Param('usernameOrEmail') usernameOrEmail: string) {
    return this.usersService.remove(usernameOrEmail);
  }
}
