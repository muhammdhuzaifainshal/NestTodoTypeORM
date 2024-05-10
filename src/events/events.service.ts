import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventsRepository } from './events.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private eventRepository: EventsRepository
  ) { }

  create(createEventDto: CreateEventDto, userId: number) {
    return this.eventRepository.save({
      users: [],
      user: { id: userId },
      title: createEventDto.title
    })
  }

  findCreated(id: number) {
    return this.eventRepository.find({
      where: {
        user: {
          id: id
        }
      }
    })
  }

  findAll() {
    return this.eventRepository.find();
  }

  findJoined(id: number) {
    return this.eventRepository.find({
      where: {
        users: {
          id: id
        }
      }
    });
  }


  async join(id: number, userID: User) {
    console.log(userID);

    const event = await this.eventRepository.findOne({
      where: {
        id: id
      },
      relations: {
        users: true
      }
    });

    if (!event) throw new ForbiddenException('Event does not exist')
    const users: User[] = event.users;

    users.push(userID)
    const newObj = { ...event, users: users }

    await this.eventRepository.save(newObj);
  }


  async remove(id: number, userID: number) {
    const event = await this.eventRepository.findOne({
      where: {
        id: id,
        user: {
          id: userID
        }
      }
    });
    if (!event) throw new ForbiddenException("Event not found")

    this.eventRepository.delete(event);
  }
}
