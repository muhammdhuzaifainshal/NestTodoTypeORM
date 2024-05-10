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

        // const hashedPassword = await argon.hash(body.password);

        // try {
        //     const user = await this.prisma.user.create({
        //         data: {
        //             Name: body.name,
        //             email: body.email,
        //             password: hashedPassword
        //         }
        //     });

        //     return this.token(user.id, user.email);

        // } catch (error) {
        //     // @unique email (email should be unique) errors are not catched by app automatically handle here 
        //     if (error instanceof PrismaClientKnownRequestError) {
        //         if (error.code === 'P2002') {
        //             // the above error code is for duplication
        //             throw new ForbiddenException('Email already Taken')
        //         }
        //     }
        //     throw error;
        // }

        return this.userService.userCreate(body)

    }


    async signin(body: signinDTO) {
        // const user = await this.prisma.user.findFirst({
        //     where: {
        //         email: body.email
        //     }
        // })

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
