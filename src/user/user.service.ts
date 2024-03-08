import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>
    ) { }


    async search(query: string) {

        return this.userRepository
            .createQueryBuilder('entity')
            .where('entity.email LIKE :query', { query: `%${query}%` })
            .getMany()
    }


    async getUserByEmail(email: string) {

        const user = await this.userRepository.findOne({
            where: {
                email,
            }
        });

        return user;
    }
}
