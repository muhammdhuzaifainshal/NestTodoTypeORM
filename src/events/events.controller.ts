import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { jwtGuard } from 'src/auth/guard/authGuard';
import { GetUser } from 'src/auth/decorator/authDecorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(jwtGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto, @GetUser('id') userID: number) {
    return this.eventsService.create(createEventDto, userID);
  }

  @Get('/all')
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('/created')
  findCreated(@GetUser('id') userID: number) {
    return this.eventsService.findCreated(userID);
  }

  @Get('/joined')
  findJoined(@GetUser('id') userID: number) {
    return this.eventsService.findJoined(userID);
  }


  @Get('/join/:id')
  joinEvent(@GetUser() userID: User, @Param('id') id: string) {
    return this.eventsService.join(+id, userID)
  }


  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userID: number) {
    return this.eventsService.remove(+id, userID);
  }
}
