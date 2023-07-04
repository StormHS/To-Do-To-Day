import { ChangeEvent, useState } from 'react'
import { TaskRecord } from '../../models/task'

interface Props {
  id: number
  name: string
  description: string
  completed: boolean
  onChange: (task: TaskRecord) => void
  onUpdateComplete: () => void
}

export default function EditingView({
  id,
  name,
  description,
  completed,
  onChange,
}: Props) {
  const [form, setForm] = useState<TaskRecord>({
    id,
    name,
    description,
    completed
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newTask = { ...form, [name]: value }
    setForm(newTask)
    onChange(newTask)
  }

  return (
    <div>
      <ul key={id}>
        <li>
          Task:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </li>
        <li>
          Notes:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </li>
      </ul>
    </div>
  )
}
