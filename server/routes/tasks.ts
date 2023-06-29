import express from 'express'
import * as db from '../db//tasks'
import { TaskData } from '../../models/task'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()

// GET /api/v1/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.getAllTasks()

    res.json({ tasks })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

// GET /api/v1/tasks/:id
router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.sendStatus(400)
      return
    }

    const task = await db.getTaskById(id)
    res.json({ task })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// POST /api/v1/tasks

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  try {
    const newTask = req.body as TaskData
    if (!newTask) {
      res.sendStatus(400)
      return
    }
    const Task = await db.addTask(newTask)
    res.json({ Task })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

// DELETE /api/v1/task
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const id = parseInt(req.params.id)

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  if (isNaN(id)) {
    res.status(400).send('ID must be a number')
    return
  }

  try {
    await db.deleteTask(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).send('could not delete Task')
  }
})

// Edit/api/v1/task
router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send('Bad Request: ID must be a number')
    return
  }
  const task = req.body
  //             Could be wrong here
  await db.editTask(task, id)
  res.sendStatus(200)
})

export default router
