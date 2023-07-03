import { getTasks } from '../apis/tasks'
import { useQuery } from '@tanstack/react-query'
import NavBar from './NavBar'

export default function CompletedTasks() {
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
  const results = tasks.filter((task) => task.completed)

  // todo: if authenticated

  return (
    <section>
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
                <li>
                  <h2>Task: {name}</h2>
                  <p>Notes: {description}</p>
                </li>
              </ul>
            )
          })}
        </div>
      </div>
    </section>
  )
}
