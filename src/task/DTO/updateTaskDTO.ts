import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class updateTaskDTO {
    @IsOptional()
    @ApiProperty({
        name: "title",
        example: 'TItle to be updated goes here'
    })
    @IsString()
    title: string;


    @IsOptional()
    @ApiProperty({
        name: "content",
        example: 'Your content to be updated goes here'
    })
    @IsString()
    content: string;


}