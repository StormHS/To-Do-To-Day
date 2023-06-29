import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../apis/tasks'
import Home from './Home'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import TodoTodayListPopUp from './Partial/todoListPopUp'
import NaviBar from './Partial/navbar'

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
        <NaviBar />
        <h1>To Do To Day</h1>
        <img
          className="companion-img"
          src="../../images/companion.png"
          alt="Little animal"
        />
        <TodoTodayListPopUp />
        {tasks.map(({ id, name, description }) => {
          return (
            <ul key={id}>
              <li>Task: {name}</li>
              <li>Notes: {description}</li>
            </ul>
          )
        })}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
    </section>
  )
}
