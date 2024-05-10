import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class authStrategy extends PassportStrategy(Strategy) {

    constructor(config: ConfigService, private userService: UserService) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: { id: number, email: string }) {
        // const user = await this.prisma.user.findFirst({
        //     where:{
        //         id:payload.id,
        //     }
        // })

        const user = await this.userService.findFirstId(payload)

        delete user.password
        return user;

    }


}