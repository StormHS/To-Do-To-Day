import { useQuery, useMutation } from "@tanstack/react-query";
import { getTasks } from "../apis/tasks";

export default function DisplayAllTasks() {
  const {
    data: tasks,
    error, 
    isLoading,
  } = useQuery(['tasks'], getTasks)

  if (error) {
    if (error instanceof Error) {
      return <div>There was an error: {error.message}</div>
    } else {
      return <div>There was an unexpected error</div>
    }
  }

  if(!tasks || isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section>
      {tasks.map(({ id, name, description}) => {
        return (
          <ul key={id}>
            <li>Task: {name}</li>
            <li>Notes: {description}</li>
          </ul>
        )
      })}
    </section>
  )
}
