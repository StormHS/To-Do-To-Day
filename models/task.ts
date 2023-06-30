export interface Task {
  id: number
  name: string
  description: string
  completed: boolean
}

export interface TaskData {
  name: string
  description: string
  completed: boolean
}

export interface UpdateTask {
  token: string
  tasks: Task[]
}
