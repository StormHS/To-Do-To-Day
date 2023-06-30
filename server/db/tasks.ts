import connection from './connection'
import { Task, TaskData } from '../../models/task'
import db from './connection'

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

export async function editTasks(tasks: Task[]) {
  const updatePromises: unknown[] = []
  tasks.forEach((task) => {
    const updatePromise = db('taskListDay').where({ id: task.id }).update(task)
    updatePromises.push(updatePromise)
  })
  // updatePromises = [Promise, ]
  return await Promise.all(updatePromises)

}
