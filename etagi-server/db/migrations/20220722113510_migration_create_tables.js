/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

//Прод версия пока что без доп таблиц
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(table) {
        table.increments().primary()
        table.string('name', 255).notNullable()
        table.string('surname', 255).notNullable()
        table.string('patronymic', 255).notNullable()
        table.string('password', 255).notNullable()
        table
            .integer('supervisor')
            .references('id')
            .inTable('users')
    })
    .createTable('tasks', function(table) {
        table.increments().primary()
        table.string('name', 255).notNullable()
        table.string('description', 255).notNullable()
        table.timestamp('finishes_at').defaultTo(knex.fn.now())
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.integer('priority').notNullable()
        table.integer('status').notNullable()
        table
            .integer('creator')
            .references('id')
            .inTable('users')
        table
            .integer('responsible')
            .references('id')
            .inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('tasks')
};
