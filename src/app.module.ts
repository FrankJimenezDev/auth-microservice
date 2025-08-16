import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './shared/db/database.module';
import { RedisModule } from './redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule, 
    UsersModule, 
    DatabaseModule, 
    RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
