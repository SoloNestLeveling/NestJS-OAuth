import { BadRequestException, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';


@Module({
  imports: [],
  exports: [CommonService],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {

}
