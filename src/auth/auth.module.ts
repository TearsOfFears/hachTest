import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { AccessStrategy } from './strategies/access.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserSubject } from '../subject/entities/userSubject.entity';
import { EmailModule } from '../mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User, UserSubject]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    EmailModule,
    PassportModule,
  ],
  exports: [UserRepository, AccessStrategy, AuthService],
  controllers: [AuthController],
  providers: [UserRepository, AccessStrategy, AuthService],
})
export class AuthModule {}
