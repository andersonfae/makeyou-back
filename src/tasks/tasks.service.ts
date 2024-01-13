import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async createTask(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async updateTask(id: string, updatedTask: Task): Promise<Task> {
    try {
      const existingTask = await this.taskModel
        .findOneAndUpdate({ _id: id }, updatedTask, { new: true })
        .exec();

      if (!existingTask) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return existingTask;
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async deleteTask(id: string): Promise<Task> {
    try {
      const deletedTask = await this.taskModel
        .findOneAndDelete({ _id: id })
        .exec();

      if (!deletedTask) {
        throw new NotFoundException(`Task with id ${id} not found`);
      }

      return deletedTask;
    } catch (error) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
