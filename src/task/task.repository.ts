import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> { }