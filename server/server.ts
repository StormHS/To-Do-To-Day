import express from 'express'

import taskRoutes from './routes/tasks'

const server = express()

server.use(express.json())

server.use('/api/v1/tasks', taskRoutes)
if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}

export default server
