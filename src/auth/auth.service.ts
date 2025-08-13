import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {  
  singIn(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

}
