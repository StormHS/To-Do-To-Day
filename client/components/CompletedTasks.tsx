import { deleteCompletedTasks, getTasks, updateCompletion } from '../apis/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { TaskRecord } from '../../models/task'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Home from './Home'
import Popup from 'reactjs-popup'
import Undo from './Undo'
import imgUrl from '../images/companion.png'


export default function CompletedTasks() {
  const auth = useAuth0()
  const {
    data: tasks,
    error,
    isLoading,
  } = useQuery(['tasks'], () => getTasks(auth))
  const [editedTasks, setEditedTasks] = useState<TaskRecord[] | undefined>(
    undefined
  )
  const queryClient = useQueryClient()
  const [over, setOver] = useState(false)

  const deleteTaskMutation = useMutation(deleteCompletedTasks, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const handleDeleteClick = async () => {
    const token = await auth.getAccessTokenSilently()
    deleteTaskMutation.mutate({ token })
  }

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
          completed: !task.completed,
        }
      }
      return task
    })
    setEditedTasks(updatedTasks)

    const taskToUpdate = tasks?.find((task) => task.id === taskId)
    console.log(taskToUpdate)
    if (taskToUpdate)
      try {
        await completeTaskMutation.mutate({ ...taskToUpdate, completed: false })
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

  return (
    <section>
      <IfAuthenticated>
        <div>
          <h1>What You Did Today</h1>
          <div className="container">
            <div className="img-container">
              <img className="imgFlex" src={imgUrl} alt="Little animal" />
            </div>

            <ul className="listFlex">
              {results.map(({ id, name, description, completed }) => {
                return (
                  <li key={id} style={{ listStyleType: 'circle' }}>
                    <div className="in-line-flex">
                      <h2>
                        {' '}
                        <Popup
                          trigger={
                            <button className="task-written">{name}</button>
                          }
                          position="bottom center"
                        >
                          <p className="notes">{description}</p>
                        </Popup>
                      </h2>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onMouseOver={() => setOver(true)}
                        onMouseLeave={() => setOver(false)}
                        onFocus={() => setOver(true)}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          style={{
                            marginRight: '0.5rem',
                            visibility: 'hidden',
                          }}
                          checked={completed}
                          onChange={() => handleTaskComlpete(id)}
                        />
                        <Undo />
                      </label>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <button className="delete-all-button" onClick={handleDeleteClick}>
            delete all
          </button>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
    </section>
  )
}
