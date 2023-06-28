import db from './connection'
import { Task } from '../../models/task'

export async function getAllTasks(): Promise<Task[]> {
  const allTasks = await db('taskListDay').select()
  console.log(allTasks)
  return allTasks
}
