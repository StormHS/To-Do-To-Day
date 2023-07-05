import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import request from 'supertest'
import server from '../../server'
import * as db from '../../db/tasks'
import checkJwt from '../../auth0'

vi.mock('../../auth0')
vi.mock('../../db/tasks')

afterEach(() => {
  vi.clearAllMocks()
})

describe('GET/api/v1/tasks', () => {
  beforeEach(() => {
    vi.mocked(checkJwt).mockImplementation((req, res, next) => {
      req.auth = {
        header: {},
        token: '',
        sub: 'auth0|1234',
      }

      next()
    })
  })

  it('should return an array of tasks', async () => {
    vi.mocked(db.getAllTasks).mockResolvedValue([
      {
        id: 1,
        name: 'mock task',
        description: 'testing api',
        completed: false,
        auth0id: 'auth0|1234',
      },
    ])

    const response = await request(server).get('/api/v1/tasks')

    expect(response.body).toMatchInlineSnapshot(`
      {
        "tasks": [
          {
            "auth0id": "auth0|1234",
            "completed": false,
            "description": "testing api",
            "id": 1,
            "name": "mock task",
          },
        ],
      }
    `)
  })

  it('should render an error message if db fails', async () => {
    vi.mocked(db.getAllTasks).mockImplementation(async () => {
      throw new Error('SQLITE ERROR: mock error')
    })
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const response = await request(server).get('/api/v1/tasks')

    expect(console.error).toHaveBeenCalledWith(
      new Error('SQLITE ERROR: mock error')
    )
    expect(response.body.message).toEqual('Something went wrong')
  })
})

describe('GET /api/v1/tasks/:id', () => {
  beforeEach(() => {
    vi.mocked(checkJwt).mockImplementation((req, res, next) => {
      req.auth = {
        header: {},
        token: '',
        sub: 'auth0|1234',
      }
      next()
    })
  })

  it('should return a task with a matching id', async () => {
    const testId = 1
    const testTask = {
      id: testId,
    }
    vi.mocked(db.getTaskById).mockResolvedValue(testTask)

    const response = await request(server).get(`/api/v1/tasks/1`)

    expect(response.body).toEqual({ task: testTask })
    console.log(response.body)
  })
})
