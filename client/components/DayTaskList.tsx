import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { editTask, getTasks, updateCompletion } from '../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Home from './Home'
import TodoTodayListPopUp from './AddItemPopUp'
import NavBar from './NavBar'
import EditingView from './EditingView'
import { TaskRecord } from '../../models/task'

export default function AllTasks() {
  const { data: tasks, error, isLoading } = useQuery(['tasks'], getTasks)
  const [editing, setEditing] = useState(false)
  const [editedTasks, setEditedTasks] = useState<TaskRecord[] | undefined>(undefined)
  const queryClient = useQueryClient()
  const { getAccessTokenSilently, isLoading: isLoadingAuth } = useAuth0()

  useEffect(() => {
    if (tasks && !editedTasks) {
      setEditedTasks(tasks)
    }
  }, [tasks, editedTasks])

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  const onEditingViewChange = (task: TaskRecord) => {
    const updatedEditedTasks = editedTasks?.map((editedTask) => {
      if (editedTask.id === task.id) {
        return task
      } else {
        return editedTask
      }
    })
    setEditedTasks(updatedEditedTasks)
  }

  const editViewMutation = useMutation(editTask, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const completeTaskMutation = useMutation(updateCompletion, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['tasks'])
    },
  })

  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    if (editedTasks) {
      editViewMutation.mutate({
        token,
        tasks: editedTasks,
      })
      setEditing(false)
    }
  }

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
    await completeTaskMutation.mutate({...taskToUpdate, completed: true})
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

  if (!tasks || isLoading || isLoadingAuth) {
    return <div>Loading...</div>
  }
  const incompleteTasks = tasks.filter((task) => !task.completed)
  
  return (
    <section>
      <IfAuthenticated>
        <NavBar />
        <h1>To Do To Day</h1>
        <div className="container">
          <div className="img-container">
            <img
              className="imgFlex"
              src="../../images/companion.png"
              alt="Little animal"
            />
            <TodoTodayListPopUp />
            <div>
              <span>
                <button
                  className="add-edit-button"
                  onClick={handleStartEditingClick}
                >
                  {' '}
                  Edit
                </button>
                {editing && <button onClick={handleSave}>Save</button>}
              </span>
            </div>
            <ul className="listFlex">
              {incompleteTasks.map(({ id, name, description, completed }) => {
                return (
                  <div key={id}>
                    {editing ? (
                      <EditingView
                        id={id}
                        name={name}
                        description={description}
                        completed={completed}
                        onUpdateComplete={() => setEditing(false)}
                        onChange={onEditingViewChange}
                      />
                    ) : (
                      <li key={id} style={{ listStyleType: 'none'}}>
                        <label style={{ display: 'flex', alignItems: 'center'}}>
                          <input 
                            type="checkbox"
                            style={{ marginRight: '0.5rem'}}
                            checked={completed}
                            onChange={() => handleTaskComlpete(id)}
                          />
                          </label>
                        <p>TaskRecord: {name}</p>
                        <p>Notes: {description}</p>
                      </li>
                    )}
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <Home />
      </IfNotAuthenticated>
    </section>
  )
}
