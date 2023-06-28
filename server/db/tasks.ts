import connection from './connection'
import { Task } from '../../models/task'

export function getAllTasks(db = connection): Promise<Task[]> {
  return db('task').select()
}
