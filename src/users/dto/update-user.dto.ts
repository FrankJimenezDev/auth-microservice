import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    username?: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    password?: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'test1@test.com'
    })
    email?: string;

    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
    })
    firstName?: string;

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
    })
    lastName?: string;

    @ApiProperty({
        description: 'The age of the user',
        example: 30,
    })
    age?: number;
}
