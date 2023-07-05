import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'
import Confetti from 'react-confetti'
import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const auth = useAuth0()
  const { data: tasks } = useQuery(['tasks'], () => getTasks(auth))
  const completedTasks = tasks?.filter((task) => task.completed)
  const progress = completedTasks?.length || 0
  const totalTasks = tasks?.length || 0
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (progress === totalTasks) {
      setIsComplete(true)
      const timeout = setTimeout(() => {
        setIsComplete(false)
      }, 5000)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(false)
    }
  }, [progress, totalTasks])

  return (
    <div>
      <progress className="progress-bar" value={progress} max={totalTasks} />
      {isComplete && totalTasks > 0 && <Confetti />}
    </div>
  )
}
