import React, { ChangeEvent, useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { editTask } from '../../apis/tasks'
import { Task } from '../../../models/task'

interface Props {
  name: string
  id: number
  description: string
  onChange: (task: Task) => void
  onUpdateComplete: () => void
}

export default function EditingView({
  id,
  name,
  description,
  onChange,
  onUpdateComplete,
}: Props) {
  const [form, setForm] = useState({ id, name, description })

  const queryClient = useQueryClient()

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
