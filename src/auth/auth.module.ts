import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/user/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([
      UserModel,
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, UserService],
})
export class AuthModule { }
