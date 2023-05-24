import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../auth/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}
  async sendConfirmMail(dtoIn: User) {
    const urlConfirmAddress = this.configService.get<string>(
      'URL_CONFIRM_ADDRESS',
    );
    try {
      await this.mailerService.sendMail({
        to: dtoIn.email,
        subject: 'Registration confirm',
        template: join(__dirname, './templates', 'confirmReg'),
        context: {
          id: dtoIn.userId,
          username: dtoIn.name,
          urlConfirmAddress,
        },
      });
    } catch (e) {
      throw new HttpException(
        `Something wrong with send email: ${JSON.stringify(e)}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  async sendRestoreMail(dtoIn: User) {
    const urlConfirmAddress = this.configService.get<string>(
      'URL_CONFIRM_ADDRESS',
    );
    try {
      await this.mailerService.sendMail({
        to: dtoIn.email,
        subject: 'Restore password',
        template: join(__dirname, './templates', 'restorePassword'),
        context: {
          id: dtoIn.userId,
          username: dtoIn.name,
          urlConfirmAddress,
        },
      });
    } catch (e) {
      throw new HttpException(
        `Something wrong with send email: ${JSON.stringify(e)}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
