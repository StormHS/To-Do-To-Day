import express from 'express'
import { join } from 'node:path'

import taskRoutes from './routes/tasks'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/tasks', taskRoutes)

export default server
