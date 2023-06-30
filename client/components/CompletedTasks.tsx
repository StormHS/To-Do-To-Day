import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { TaskData } from '../../models/task'
import { getTasks } from '../apis/tasks'
import { useQuery } from '@tanstack/react-query'

export default function CompletedTasks() {
  const { data: tasks, error, isLoading } = useQuery(['tasks'], getTasks)
  console.log()

  if (error) {
    if (error instanceof Error) {
      return <div>There was an error: {error.message}</div>
    } else {
      return <div>There was an unexpected error</div>
    }
  }

  if (!tasks || isLoading) {
    return <div>Loading...</div>
  }
  const results = tasks.filter((task) => task.completed)

  return (
    <section>
      {/* <IfAuthenticated> */}
      <div>
        <h1>What You Did Today</h1>
        <div className="container">
          <div className="img-container">
            <img
              className="imgFlex"
              src="../../images/companion.png"
              alt="Little animal"
            />
          </div>
          {results.map(({ id, name, description }) => {
            return (
              <ul className="listFlex" key={id}>
                <li>Task: {name}</li>
                <li>Notes: {description}</li>
              </ul>
            )
          })}
        </div>
      </div>
      {/* </IfAuthenticated> */}
    </section>
  )
}
