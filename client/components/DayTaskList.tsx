import { useQuery, useMutation } from '@tanstack/react-query'
import { getTasks } from '../apis/tasks'
import Home from './Home'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function DisplayAllTasks() {
  const { data: tasks, error, isLoading } = useQuery(['tasks'], getTasks)

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

  return (
    <section>
      <IfAuthenticated>
        <h1>To Do To Day</h1>
        <div className="container">
          <div className="img-container">
            <img
              className="imgFlex"
              src="../../images/companion.png"
              alt="Little animal"
            />
          </div>
          <ul className="listFlex">
            {tasks.map(({ id, name, description }) => {
              return (
                <li key={id}>
                  <p>Task: {name}</p>
                  <p>Notes: {description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
    </section>
  )
}
