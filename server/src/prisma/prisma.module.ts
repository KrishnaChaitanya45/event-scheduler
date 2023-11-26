import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//? Prisma module which is used to work with prisma client
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
