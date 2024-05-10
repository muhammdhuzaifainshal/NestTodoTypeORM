import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsRepository extends Repository<Event> { }