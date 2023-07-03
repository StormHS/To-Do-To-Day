export interface TaskRecord {
  id: number
  name: string
  description: string
  completed: boolean
  auth0id: string
}

export type TaskData = Omit<TaskRecord, 'id'>

export interface UpdateTask {
  token: string
  tasks: TaskRecord[]
}

export interface DeleteTask {
  id: TaskRecord['id']
  token: string
}
