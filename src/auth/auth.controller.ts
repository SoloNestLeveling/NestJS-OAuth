import { Controller, Get, InternalServerErrorException, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserModel } from 'src/user/entity/user.entity';
import axios from 'axios';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }



  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response
  ) {

    res.send({ message: '로그인' })
  }


  @Get('logout')
  logout(
    @Req() req: Request,
    @Res() res: Response
  ) {
    req.logOut(async (e) => {
      if (e) {
        throw new InternalServerErrorException('로그아웃중 에러 발생')
      } else {

        res.clearCookie('connect.sid', { httpOnly: true })
        res.redirect('/')
      }
    });

  }


  @Get('decode')
  decode(@Req() req: Request) {

    const payload = this.authService.verifyToken(req)

    console.log(payload)



  }
}
