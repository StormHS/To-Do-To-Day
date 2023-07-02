exports.up = (knex) => {
  return knex.schema.createTable('taskListDay', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('description')
    table.boolean('completed')
    table.string('auth0id')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('taskListDay')
}
