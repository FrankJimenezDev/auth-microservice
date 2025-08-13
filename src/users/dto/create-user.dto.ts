import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreateUserDto {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    @IsString()
    password: string;

    @IsString()
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@email.com'
    })
    email: string;
}
