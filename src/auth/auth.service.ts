import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }
  async logIn(createAuthDto: CreateAuthDto) : Promise<string> {
    try {
      const user = await this.usersService.findOne(createAuthDto.usernameOrEmail);
      const isMatch = await user.comparePassword(createAuthDto.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: user.username, sub: user.id };
      const token = await this.jwtService.signAsync(payload);

      return token;

    } catch (error) {
      this.logger.error('Error logginf user:', error);
      return error.message;
    }
  }

}
