import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AccessTokenGuard } from 'src/common/guards';
import { GetCurrentUser } from 'src/common/decorators';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return this.eventsService.create(createEventDto, userId);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@GetCurrentUser('userId') userId: string, @Req() req: Request) {
    return this.eventsService.findAll(userId, req);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.eventsService.findOne(id, userId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    console.log(userId);
    return this.eventsService.update(id, updateEventDto, userId);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.eventsService.remove(id, userId);
  }
}
