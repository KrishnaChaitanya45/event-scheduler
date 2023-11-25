import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [EventsController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, EventsService],
  imports: [PrismaModule, JwtModule.register({})],
})
export class EventsModule {}
