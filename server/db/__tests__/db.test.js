import { beforeAll, beforeEach, afterAll, expect, describe, it } from 'vitest'
import connection from '../connection'
import * as db from '../tasks'

beforeAll(() => {                                                                                                                                                                                                                                               
  return connection.migrate.latest()
})

beforeEach(async() => {
 await connection.seed.run()
})

afterAll(() => {
  return connection.destroy()
})

const auth0Id = '1'



describe('getAllTasks', () => {
  it('should return a list of tasks', async () => {
    const tasks = await db.getAllTasks(auth0Id, connection)

    expect(tasks).toHaveLength(1)
  })
})

describe('addTask', () => {
  it('should add a task to the database', async () => {
    const testData = {
      name: 'test',
      description: 'test disc',
      completed: false, 
      auth0id: auth0Id
    }
    const EXPECTED_ID = 4
    const EXPECTED_LENGTH = 2
    const [newTask] = await db.addTask(testData)
    
    const tasks = await db.getAllTasks(auth0Id)
   
    expect(newTask.id).toBe(EXPECTED_ID)
    expect(tasks).toHaveLength(EXPECTED_LENGTH)
    expect(newTask).toMatchInlineSnapshot(`
      {
        "auth0id": "1",
        "completed": 0,
        "description": "test disc",
        "id": 4,
        "name": "test",
      }
    `)
  })
})

describe('moveCompletedTask', () => {
  it('should update the completion status of a task', async () => {
    const id = 1
    const completed = true

    const task = await db.moveCompletedTask(id, completed, connection);
    
    expect(task.completed).toBeTruthy()
    expect(task.id).toBe(id);
    expect(Boolean(task.completed)).toEqual(completed);
  })
})

describe('deleteTask', () => {
  it('should delete a task from the database', async () => {
    const id = 1
    const auth0id = auth0Id
    const tasks = await db.getAllTasks(auth0id, connection)
   
    await db.deleteTask(id, auth0id, connection)

    const updatedList = await db.getAllTasks(auth0id, connection)
    
    expect(updatedList.length).toBe(tasks.length -1)
  })
})