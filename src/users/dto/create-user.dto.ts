import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateUserDto {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@email.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;
}
