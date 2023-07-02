export interface TaskRecord {
  id: number
  name: string
  description: string
  completed: boolean
}

export type TaskData = Omit<TaskRecord, 'id'>

export interface UpdateTask {
  token: string
  tasks: TaskRecord[]
}
