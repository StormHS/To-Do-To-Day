import request from 'superagent'
import { Task, TaskData } from '../../models/task'

const tasksUrl = '/api/v1/tasks'

export async function getTasks(): Promise<Task[]> {
  const response = await request.get(tasksUrl)
  console.log(response.body)
  return response.body.tasks
  
}
