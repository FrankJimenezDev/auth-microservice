import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-atuth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  findOne(@Param('username') usernameOrEmail: string) {
    return this.usersService.findOne(usernameOrEmail);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':usernameOrEmail')
  update(@Param('usernameOrEmail') usernameOrEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(usernameOrEmail, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':usernameOrEmail')
  remove(@Param('usernameOrEmail') usernameOrEmail: string) {
    return this.usersService.remove(usernameOrEmail);
  }
}
