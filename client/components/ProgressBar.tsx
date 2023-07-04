import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'

export default function ProgressBar() {
  const auth = useAuth0()
  const { data: tasks } = useQuery(['tasks'], () => getTasks(auth))
  const completedTasks = tasks?.filter((task) => task.completed)
  const progress = completedTasks?.length || 0
  const totalTasks = tasks?.length || 0

  return <progress className="progress-bar" value={progress} max={totalTasks} />
}
