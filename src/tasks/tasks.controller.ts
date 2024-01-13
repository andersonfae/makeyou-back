import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() task: Task): Promise<Task> {
    return await this.tasksService.createTask(task);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updatedTask: Task,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, updatedTask);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.deleteTask(id);
  }
}
