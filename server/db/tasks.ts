import connection from './connection'
import { Task, TaskData } from '../../models/task'
import db from './connection'

export function getAllTasks(db = connection): Promise<Task[]> {
  return db('taskListDay').select()
}

export async function addTask(newTask: TaskData): Promise<Task[]> {
  return await db<Task>('taskListDay').insert(newTask).returning('*')
}

export async function getTaskById(id: number): Promise<Task> {
  return await db('taskListDay').where('id', id).select('*').first()
}

export async function deleteTask(id: number): Promise<void> {
  await db('taskListDay').where({ id }).delete()
}

export async function editTask(
  task: Task,
  id: number
): Promise<Task | undefined> {
  return db('taskListDay').where({ id }).update(task).returning('id')
}
