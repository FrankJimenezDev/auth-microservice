import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    password: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'test@email.com'
    })
    email: string;

}
