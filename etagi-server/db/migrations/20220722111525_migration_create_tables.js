/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//здесь понял что приоритет и статус это внешние ключи, заменил на инт временно, в прод это не должно уходить
 exports.up = function(knex) {
    return knex.schema
    .alterTable('tasks', function(table) {
        table.integer('priority').notNullable().alter()
        table.integer('status').notNullable().alter()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('tasks')
};
