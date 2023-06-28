exports.seed = function (knex) {
  return knex('taskList')
    .del()
    .then(function () {
      return knex('taskList').insert([
        {
          id: '1',
          task: 'return library book',
          description: 'return How to Make Friends with the Dark by Kathleen Glasgow to the local library'
        }
        ])
      })
  }