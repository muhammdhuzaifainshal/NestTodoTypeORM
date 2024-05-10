import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class signupDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
   example: 'Huzaifa Inshal',
   required: true
})
    name:string;
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
   example: 'huzaifainshal@gmail.com',
   required: true
})
    email:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
   example: 'password',
   required: true
})
    password:string;
}