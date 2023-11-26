import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { TRPCService } from './trpc/trpc.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { TrpcRouter } from './trpc/trpc.router';
import { EventsModule } from './events/events.module';
//? This has all the services, procedures and modules of the application
@Module({
  imports: [PrismaModule, AuthModule, EventsModule],
  controllers: [AppController],
  providers: [AppService, TRPCService, AuthService, JwtService],
})
export class AppModule {}
