import { Module } from '@nestjs/common';
import { TRPCService } from './trpc.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TrpcRouter } from './trpc.router';
import { AuthService } from 'src/auth/auth.service';

//? Initially i though to use tRPC but i didn't find any better reason to use it
//? So, i just left it as it is and didn't use it 😀
@Module({
  imports: [],
  controllers: [],
  providers: [TRPCService, TrpcRouter, AuthService, PrismaService, JwtService],
})
export class tRPCModule {}
