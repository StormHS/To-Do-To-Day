import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import Popup from 'reactjs-popup'

import { TaskData } from '../../../models/task'
import { TaskCreate } from '../../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'

const initialFormData: TaskData = {
  name: '',
  description: '',
}
interface CreateVariables {
  token: string
  task: TaskData
}

async function createTask(variables: CreateVariables) {
  return TaskCreate(variables.task, variables.token)
}

export default function TodoTodayListPopUp() {
  const [form, setForm] = useState<TaskData>(initialFormData)
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const TaskCreateMutation = useMutation<void, unknown, CreateVariables>(
    createTask,
    {
      onSuccess: async () => {
        queryClient.invalidateQueries(['tasks'])
      },
    }
  )
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  function handleClear() {
    setForm(initialFormData)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newForm = { ...form }
    const token = await getAccessTokenSilently()
    TaskCreateMutation.mutate({ task: newForm, token })
    setForm(initialFormData)
  }

  if (TaskCreateMutation.isError) {
    return <div>There was an error trying to submit this form</div>
  }

  if (TaskCreateMutation.isLoading) {
    return <div>Sending this in</div>
  }

  return (
    <Popup
      trigger={<button className="add-edit-button">+</button>}
      position="right center"
    >
      <div style={{ backgroundColor: 'white', textAlign: 'center' }}>
        <div>
          <h2>Add to your to do to day list</h2>
        </div>
        <div>
          <div className="formContainer">
            <form
              onSubmit={handleSubmit}
              aria-label="Create info form"
              className="mr-10 mt-12"
            >
              <label htmlFor="name">
                <h3>Your To Do</h3>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                required
              ></input>{' '}
              <br />
              <label htmlFor="description">
                <h3>Description of what you need to do</h3>
              </label>
              <input
                id="description"
                type="text"
                name="description"
                onChange={handleChange}
                value={form.description}
                required
              ></input>
              <div className="buttonContainer">
                <button className="button">Submit</button>
                <button className="button" onClick={handleClear}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Popup>
  )
}
