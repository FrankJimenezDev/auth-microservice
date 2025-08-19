import { Injectable, Logger, UnauthorizedException, Inject } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) { }

  async logIn(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    try {
      const user = await this.usersService.findOne(createAuthDto.usernameOrEmail);
      const isMatch = await user.comparePassword(createAuthDto.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: user.username, sub: user.id };
      const token = await this.jwtService.signAsync(payload);

      await this.redis.set(`user:${user.id}`, token);

      return {
        token
      };
    } catch (error) {
      this.logger.error('Error logging user:', error);
      return error.message;
    }
  }

  async logout(userId: string) {
    await this.redis.del(`user:${userId}`);
  }
}
