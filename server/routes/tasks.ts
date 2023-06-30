import express from 'express'
import * as db from '../db//tasks'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()

    res.json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const taskId = Number(req.params.id)
    const completedTaskData = req.body.completed as boolean
    const completedTask = await db.moveCompletedTask(taskId, completedTaskData)
    res.json(completedTask)
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
