/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('taskListDay').del()
  await knex('taskListDay').insert([
    {
      id: 1,
      name: 'return library book',
      description:
        'return How to Make Friends with the Dark by Kathleen Glasgow to the local library',
      completed: false,
      auth0id: '1',
    },
    {
      id: 2,
      name: 'clean car',
      description: 'car is dirty',
      completed: false,
      auth0id: '2',
    },
    {
      id: 3,
      name: 'clean car again',
      description: 'it rained after the first one',
      completed: false,
      auth0id: 'google-oauth2|104154911859064202724',
    },
  ])
}
