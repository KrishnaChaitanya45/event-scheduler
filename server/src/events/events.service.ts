import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  async create(createEventDto: CreateEventDto, creatorId: string) {
    const { title, description, date, label } = createEventDto;
    const user = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        date,
        label,
        creatorId,
      },
      include: {
        creator: true,
      },
    });
    return event;
  }

  findAll(userId: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.event.findMany({
      where: { creatorId: userId },
    });
  }

  findOne(id: string, userId: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.event.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { title, description } = updateEventDto;
    return this.prisma.event.update({
      where: { id: id },
      data: {
        title,
        description,
      },
    });
  }

  remove(id: string, userId: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prisma.event.delete({
      where: { id: id },
    });
  }
}
