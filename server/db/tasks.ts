import connection from './connection'
import { Task } from '../../models/task'

export function getAllTasks(db = connection): Promise<Task[]> {
  return db('taskListDay').select()
}

// hello!
export async function moveCompletedTask(
  id: number,
  completed: boolean,
  db = connection
): Promise<Task> {
  const [task] = await db('taskListDay')
    .update({ completed: completed })
    .where('id', id)
    .returning('*')
  return task
}
