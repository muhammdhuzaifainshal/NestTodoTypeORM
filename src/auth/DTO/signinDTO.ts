import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class signinDTO{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'abc123@gmail.com',
        required: true
     })
    email:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'abc123',
        required: true
     })
    password:string;
}