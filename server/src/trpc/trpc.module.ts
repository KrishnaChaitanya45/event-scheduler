import { Module } from '@nestjs/common';
import { TRPCService } from './trpc.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TrpcRouter } from './trpc.router';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [],
  controllers: [],
  providers: [TRPCService, TrpcRouter, AuthService, PrismaService, JwtService],
})
export class tRPCModule {}
