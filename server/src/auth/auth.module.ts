import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { tRPCModule } from 'src/trpc/trpc.module';
import { TRPCService } from 'src/trpc/trpc.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//? This module has all the controllers, providers and imports for the authentication
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TRPCService,
  ],
  imports: [PrismaModule, JwtModule.register({}), tRPCModule],
})
export class AuthModule {}
