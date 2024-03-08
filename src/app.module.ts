import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE_KEY, DB_HOST_KEY, DB_PASSWORD_KEY, DB_PORT_KEY, DB_USERNAME_KEY } from './common/const/env-path.const';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UserModel } from './user/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { APP_INTERCEPTOR } from '@nestjs/core';


@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env[DB_HOST_KEY],
      port: parseInt(process.env[DB_PORT_KEY]),
      username: process.env[DB_USERNAME_KEY],
      password: process.env[DB_PASSWORD_KEY],
      database: process.env[DB_DATABASE_KEY],
      entities: [UserModel],
      synchronize: true,

    }),
    CommonModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule { }
