import { ForbiddenException, Injectable } from '@nestjs/common';
import { signupDTO } from './DTO/signupDTO';
import { signinDTO } from './DTO/signinDTO';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserRepository } from 'src/user/user.repository';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwt: JwtService, private config: ConfigService) {

    }

    async signup(body: signupDTO) {

        const user = await this.userService.userCreate(body)
        return this.token(user.id, user.email);

    }


    async signin(body: signinDTO) {

        const user = await this.userService.findFirst(body);

        if (!user) {
            throw new ForbiddenException('No account found for the given EMAIL')
        }

        const pwMatches = await argon.verify(user.password, body.password);

        if (!pwMatches) throw new ForbiddenException('Password does not matches')

        return this.token(user.id, user.email);
    }


    async token(id: number, email: string) {
        const payload = { id, email };

        const secretKey = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '8h',
            secret: secretKey
        })

        return {
            access_token: token,
        }
    }
}
