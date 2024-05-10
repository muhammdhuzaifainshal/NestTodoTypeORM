import { ForbiddenException, Injectable } from '@nestjs/common';
import { editUserDTO } from './DTO/editUserDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon from 'argon2';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
    private userRepository: Repository<User>,) { }

    async userCreate(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (user) {
            throw new ForbiddenException('Email should be unique');
        }
        try {
            const hashedpassword = await argon.hash(body.password);

            let user: User = new User();
            user.email = body.email;
            user.name = body.name;
            user.password = hashedpassword;

            return this.userRepository.save(user);
        } catch (error) {
            throw error
        }
    }

    async findFirst(body) {
        const user = await this.userRepository.findOne({ where: { email: body.email } })
        return user;
    }

    async findFirstId(body) {
        const user = await this.userRepository.findOne({ where: { id: body.id } })
        return user;
    }


}
