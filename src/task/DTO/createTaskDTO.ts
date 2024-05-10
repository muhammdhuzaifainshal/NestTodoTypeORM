import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class createTaskDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: "Title",
        example: 'Title goes here'
    })
    title: string;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        name: "content",
        example: 'content goes here'
    })
    content: string;


}