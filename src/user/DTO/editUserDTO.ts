import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class editUserDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({
        name: "Name",
        example: 'abc123'
    })
    Name?: string
}