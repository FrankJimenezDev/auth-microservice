import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsString()
    username?: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    @IsString()
    password?: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'test1@test.com'
    })
    @IsString()
    email?: string;

    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
    })
    @IsString()
    firstName?: string;

    
    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
    })
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 30,
    })
    @IsNumber()
    age?: number;
}
