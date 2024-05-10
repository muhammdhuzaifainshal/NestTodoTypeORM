import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/authDecorator';
import { editUserDTO } from './DTO/editUserDTO';
import { UserService } from './user.service';
import { jwtGuard } from 'src/auth/guard/authGuard';
import { Request } from 'express';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(jwtGuard)
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiResponse({
        status: 201, description: `Will return the user credentials`
    })
    @ApiResponse({
        status: 401, description: `Unauthorized`
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    @Get('/me')
    getMe(@GetUser() user: number) {
        return user
    }

}
