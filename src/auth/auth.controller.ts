import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDTO } from './DTO/signupDTO';
import { signinDTO } from './DTO/signinDTO';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @ApiResponse({
        status: 201, description: `Will return Bearer Token`
    })
    @ApiResponse({
        status: 403, description: `Email already taken`
    })
    @ApiBody({
        type: signupDTO,
        description: 'Json structure for user object',
    })
    @Post('/signup')
    signup(@Body() body: signupDTO) {
        return this.authService.signup(body);
    }






    @ApiResponse({
        status: 201, description: `Will return Bearer Token`
    })
    @ApiResponse({
        status: 403, description: `Password doesnot match`
    })
    @ApiResponse({
        status: 403, description: `No Account for given email`
    })
    @ApiBody({
        type: signinDTO,
        description: 'Json structure for user object',
    })
    @Post('/signin')
    signin(@Body() body: signinDTO) {
        return this.authService.signin(body);
    }
}
