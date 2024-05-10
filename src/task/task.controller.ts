import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { jwtGuard } from 'src/auth/guard/authGuard';
import { TaskService } from './task.service';
import { GetUser } from 'src/auth/decorator/authDecorator';
import { createTaskDTO } from './DTO/createTaskDTO';
import { updateTaskDTO } from './DTO/updateTaskDTO';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Task')
@UseGuards(jwtGuard)
@Controller('tasks')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get('')
    @ApiResponse({
        status: 201, description: `Returns all Tasks for the given user
        `})
    @ApiResponse({
        status: 401, description: `Unauthorized`
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    getAll(@GetUser('id') userID: number) {
        return this.taskService.getAll(userID);
    }





    @Get(':id')
    @ApiResponse({
        status: 201, description: `Will return by Id`
    })
    @ApiResponse({
        status: 401, description: `Unauthorized`
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    getById(@GetUser('id') userID: number, @Param('id', ParseIntPipe) taskID: number) {
        console.log(userID, taskID);

        return this.taskService.getById(userID, taskID);
    }



    @Post()
    @ApiResponse({
        status: 201, description: `
            Successfully Created
        `})
    @ApiResponse({
        status: 401, description: `Unauthorized`
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    @ApiBody({
        type: createTaskDTO,
        description: 'Json structure for user object',
    })
    create(@GetUser() userID: User, @Body() body: createTaskDTO) {
        return this.taskService.create(userID, body);
    }





    @ApiResponse({
        status: 201, description: `Content Successfully Updated
    `})
    @ApiResponse({
        status: 401, description: `Unauthorized`
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    @ApiBody({
        type: updateTaskDTO,
        description: 'Json structure for user object',
    })
    @Patch(':id')
    update(@GetUser('id') userID: number, @Param('id', ParseIntPipe) taskID: number, @Body() body: updateTaskDTO) {
        return this.taskService.update(userID, taskID, body);
    }






    @ApiResponse({
        status: 204, description: 'Successfully Deleted'
    })
    @ApiResponse({
        status: 401, description: 'Unauthorized'
    })
    @ApiResponse({
        status: 403, description: 'Task not found'
    })
    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
        required: true,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@GetUser('id') userID: number, @Param('id', ParseIntPipe) taskID: number) {
        return this.taskService.delete(userID, taskID);
    }
}
