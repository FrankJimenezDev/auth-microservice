import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return 'User created successfully';
    } catch (error) {
      this.logger.error('Error creating user:', error);
      return error.message;
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      this.logger.error('searching users:', error);
      return error.message;
    }
  }

  async findOne(usernameOrEmail: string) {
    try {
      const user = await this.userRepository.findOne({
        where: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      });

      if (!user) {
        throw new NotFoundException(`User with username/email "${usernameOrEmail}" not found`);
      }

      return user;
    } catch (error) {
      this.logger.error(`Error searching user "${usernameOrEmail}"`, error.stack);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException();
    }
  }

  async update(usernameOrEmail: string, updateUserDto: UpdateUserDto) {

    try {
      const user = await this.findOne(usernameOrEmail)
      this.userRepository.merge(user, updateUserDto);
      await this.userRepository.save(user);
      return `User with username/email "${usernameOrEmail}" was updated successfully`;
    } catch (error) {
      this.logger.error(`Error searching user "${usernameOrEmail}"`, error.stack);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException();
    }

  }

  async remove(usernameOrEmail: string) {
    try {
      const user = await this.findOne(usernameOrEmail)
      this.userRepository.merge(user, { deleted: true });
      await this.userRepository.save(user);
      return `User with username/email "${usernameOrEmail}" was updated successfully`;
    } catch (error) {
      this.logger.error(`Error searching user "${usernameOrEmail}"`, error.stack);
      throw error instanceof NotFoundException ? error : new InternalServerErrorException();
    }
  }
}
