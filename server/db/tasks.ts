import connection from './connection'
import { TaskRecord, TaskData } from '../../models/task'
import db from './connection'

export function getAllTasks(
  auth0id: string,
  db = connection
): Promise<TaskRecord[]> {
  return db('taskListDay').select().where('auth0id', auth0id)
}

// hello!
export async function moveCompletedTask(
  id: number,
  completed: boolean,
  db = connection
): Promise<TaskRecord> {
  const [task] = await db('taskListDay')
    .update({ completed: completed })
    .where('id', id)
    .returning('*')
  return task
}

export async function addTask(newTask: TaskData): Promise<TaskRecord[]> {
  return await db<TaskRecord>('taskListDay').insert(newTask).returning('*')
}

export async function getTaskById(id: number): Promise<TaskRecord> {
  return await db('taskListDay').where('id', id).select('*').first()
}

export async function deleteTask(id: number, auth0id: string): Promise<void> {
  await db('taskListDay').where({ id, auth0id }).delete()
}

export async function editTask(
  task: TaskRecord,
  id: number
): Promise<TaskRecord | undefined> {
  return db('taskListDay').where({ id }).update(task).returning('id')
}

export async function editTasks(tasks: TaskRecord[], auth0id: string) {
  return Promise.all(
    tasks.map((task) => {
      return db('taskListDay').where({ id: task.id, auth0id }).update(task)
    })
  )
}
