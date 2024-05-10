import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { createTaskDTO } from './DTO/createTaskDTO';
import { updateTaskDTO } from './DTO/updateTaskDTO';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private taskRepository: TaskRepository,
        private userService: UserService) { }

    getAll(userID: number) {
        return this.taskRepository.find({
            where: {
                user: { id: userID }
            }
        })
    }


    async getById(userID: number, taskID: number) {
        const task = await this.taskRepository.findOne({
            where: {
                id: taskID,
                user: {
                    id: userID
                }
            }
        })

        return task
    }

    async create(userID: User, body: createTaskDTO) {

        const taksCreated = await this.taskRepository.save({
            user: userID,
            title: body.title,
            content: body.content
        })

        return taksCreated
    }


    async update(userID: number, taskID: number, body: updateTaskDTO) {
        const taks = await this.taskRepository.findOne({
            where: {
                user: {
                    id: userID
                },
                id: taskID
            }
        })

        if (!taks) {
            throw new ForbiddenException('Access to resources denied',);
        }
        await this.taskRepository.update(taskID, body);

        return 'Task updated successfully'

    }


    async delete(userID: number, taskID: number) {
        const taks = await this.taskRepository.findOne({
            where: {
                user: {
                    id: userID
                },
                id: taskID
            }
        })


        if (!taks) {
            throw new ForbiddenException('Access to resources denied',);
        }

        this.taskRepository.delete(taks)
    }
}
