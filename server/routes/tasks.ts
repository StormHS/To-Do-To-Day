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

export default router
