import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID_KEY, GOOGLE_CLIENT_SECRET_KEY, GOOGLE_REDIRECT_URL_KEY, } from "src/common/const/env-path.const";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env[GOOGLE_CLIENT_ID_KEY],
            clientSecret: process.env[GOOGLE_CLIENT_SECRET_KEY],
            callbackURL: 'http://localhost:3000/auth/google/redirect',
            scope: ['email', 'profile'],
        });

    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {

        const user = await this.authService.googleValidateUser(profile, accessToken)

        done(null, user);

    }
}