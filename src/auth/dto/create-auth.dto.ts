import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {

    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsString()
    @IsNotEmpty()
    usernameOrEmail: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'strongPassword123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
