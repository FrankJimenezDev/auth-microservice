import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { selectDataBase } from './config/selectDataBseModule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    selectDataBase()
  ],
})
export class DatabaseModule {}
