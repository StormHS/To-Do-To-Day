import { getTasks, updateCompletion } from '../apis/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { TaskRecord } from '../../models/task'
import NavBar from './NavBar'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CompletedTasks() {
  const { data: tasks, error, isLoading } = useQuery(['tasks'], getTasks)
  const [editedTasks, setEditedTasks] = useState<TaskRecord[] | undefined>(undefined)
  const queryClient = useQueryClient()
  const [over, setOver] = useState(false)
  
  useEffect(() => {
    if (tasks && !editedTasks) {
      setEditedTasks(tasks)
    }
  }, [tasks, editedTasks])

  const completeTaskMutation = useMutation(updateCompletion, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const handleTaskComlpete = async (taskId: number) => {
    const updatedTasks = tasks?.map((task) => {
      if (task.id === taskId) {
        return {
          ...task, 
          completed: !task.completed
        }
      }
      return task
    })
  setEditedTasks(updatedTasks)

  const taskToUpdate =  tasks?.find((task) => task.id === taskId)
  console.log(taskToUpdate)
  if (taskToUpdate)
  try {
    await completeTaskMutation.mutate({...taskToUpdate, completed: false})
  } catch (error) {
    console.error('Unable to update task status!')
  }
  }

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
        <NavBar />
        <h1>What You Did Today</h1>
        <div className="container">
          <div className="img-container">
            <img
              className="imgFlex"
              src="../../images/companion.png"
              alt="Little animal"
            />
          </div>
          <ul className="listFlex">
            {results.map(({ id, name, description, completed }) => {
              return (
                <li key={id} style={{ listStyleType: 'none'}}>
                <label style={{ 
                    display: 'flex', 
                    alignItems: 'center' }}   
                    onMouseOver={() => setOver(true)}
                    onMouseLeave={() => setOver(false)}
                    onFocus={() => setOver(true)}
                    >
                    <FontAwesomeIcon icon={faUndo} style={over ? { color: "red" } : {}} />
                  <input 
                    type="checkbox"
                  
                    style={{ marginRight: '0.5rem', visibility: "hidden"}}
                    checked={completed}
                    onChange={() => handleTaskComlpete(id)}
                  />
                </label>
                <p>TaskRecord: {name}</p>
                <p>Notes: {description}</p>
              </li>
              )
          })}
          </ul>
        </div>
      </div>
    </section>
  )
}

