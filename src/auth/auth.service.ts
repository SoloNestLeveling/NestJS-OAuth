import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Profile } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken'
import { GOOGLE_CLIENT_SECRET_KEY } from 'src/common/const/env-path.const';
import { spec } from 'node:test/reporters';

export interface UserDetails {

    email: string;
    name: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(detail: UserDetails) {

        console.log('AuthService');
        console.log(detail)

        const user = await this.userRepository.findOne({
            where: {
                email: detail.email
            }
        });
        console.log(user)

        if (user) return user;

        const newUser = this.userRepository.create({ ...detail });

        const result = await this.userRepository.save(newUser);

        return result;
    }


    // async validateLocalUser(email: string, password: string) {

    //     const hashRound = 10

    //     const hash = await bcrypt.hash(password, hashRound)


    //     const userDB = await this.getUserByEmail(email)


    //     if (userDB && userDB.password === password) {

    //         console.log(userDB)
    //         return userDB;
    //     };

    //     console.log('userDB create')

    //     const user = this.userRepository.create({
    //         email,
    //         password,
    //         name: ''
    //     });



    //     return this.userRepository.save({ ...user, password: hash })
    // }


    async getUserById(id: number) {

        const user = await this.userRepository.findOne({
            where: {
                id,
            }
        });

        return user;
    };

    async getUserByEmail(email: string) {

        const user = await this.userRepository.findOne({
            where: {
                email
            }
        });

        return user;
    }




    googleLogin(req: Request) {
        console.log(req.user)
    }



    async googleValidateUser(profile: Profile, accessToken: string): Promise<UserModel> {

        const user = await this.userService.getUserByEmail(profile.emails[0].value)

        if (!user) {

            const newUser = new UserModel();
            newUser.email = profile.emails[0].value;
            newUser.name = profile.displayName;
            newUser.profileImg = profile.photos[0].value;
            newUser.accessToken = accessToken


            const result = await this.userRepository.save(newUser)

            console.log('newUser')
            console.log(result)

            return result
        };

        console.log('privious User')
        console.log(user)

        return user;
    }




    verifyToken(req: Request) {

        const user = req.user as UserModel

        const token = user.accessToken

        const secret = process.env[GOOGLE_CLIENT_SECRET_KEY]

        try {

            const decoded = jwt.verify(token, secret)
            console.log(decoded)
            return decoded

        } catch (err) {

            throw new InternalServerErrorException('에러발생')

        }
    }




    decodeToken(base64String: string) {

        const decode = Buffer.from(base64String, 'base64').toString('utf-8')

        const split = decode.split(':');

        if (split.length !== 2) {
            throw new UnauthorizedException('잘못된 토큰값입니다.')
        };

        const email = split[0];
        const password = split[1];

        return {
            email,
            password
        }
    }

}
