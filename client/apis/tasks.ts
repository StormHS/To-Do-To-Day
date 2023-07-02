import request from 'superagent'
import { DeleteTask, TaskData, TaskRecord, UpdateTask } from '../../models/task'
import { Auth0ContextInterface, User } from '@auth0/auth0-react'

const tasksUrl = '/api/v1/tasks'

export async function getTasks(
  auth: Auth0ContextInterface<User>
): Promise<TaskRecord[]> {
  const token = await auth.getAccessTokenSilently()
  console.log(token)
  const response = await request
    .get(tasksUrl)
    .set('Authorization', `Bearer ${token}`)
  console.log(response.body)
  return response.body.tasks
}

interface updateComplete {
  id: number
  completed: boolean
}
export async function updateCompletion({
  id,
  completed,
}: updateComplete): Promise<TaskRecord> {
  const response = await request.patch(`${tasksUrl}/${id}`).send({ completed })
  return response.body
}

export async function TaskCreate(
  Create: TaskData,
  token: string
): Promise<void> {
  await request
    .post(tasksUrl)
    .set('Authorization', `Bearer ${token}`)
    .send(Create)
}

export async function editTask({ token, tasks }: UpdateTask): Promise<void> {
  await request
    .patch(`/api/v1/tasks`)
    .set('Authorization', `Bearer ${token}`)
    .send({ tasks })
}

export async function deleteTask({ id, token }: DeleteTask): Promise<void> {
  await request
    .delete(`${tasksUrl}/${id}`)
    .set('Authorization', `Bearer ${token}`)
}
