import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useState } from 'react'
import Popup from 'reactjs-popup'
import { TaskData } from '../../models/task'
import { taskCreate } from '../apis/tasks'
import { useAuth0 } from '@auth0/auth0-react'

const initialFormData: TaskData = {
  name: '',
  description: '',
  completed: false,
  auth0id: '',
}

interface CreateTaskArgs {
  token: string
  task: TaskData
}

async function createTask(args: CreateTaskArgs) {
  return taskCreate(args.task, args.token)
}

export default function AddItemPopUp() {
  const [form, setForm] = useState<TaskData>(initialFormData)
  const queryClient = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const taskCreateMutation = useMutation<void, unknown, CreateTaskArgs>(
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
    taskCreateMutation.mutate({ task: newForm, token })
    setForm(initialFormData)
  }

  if (taskCreateMutation.isError) {
    return <div>There was an error trying to submit this form</div>
  }

  if (taskCreateMutation.isLoading) {
    return <div>Sending this in</div>
  }

  return (
    <Popup
      trigger={<button className="add-edit-button">+</button>}
      position="right center"
    >
      <div>
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
                <h3>To Do:</h3>
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
                <h3>Notes:</h3>
              </label>
              <input
                id="description"
                type="text"
                name="description"
                onChange={handleChange}
                value={form.description}
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
