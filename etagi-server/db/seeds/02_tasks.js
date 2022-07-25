/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('tasks').insert([
    {id: 0, name: "task1", description: "task1 descr", priority: "1", status: "1", creator: 0, responsible: 1},
    {id: 1, name: "task2", description: "task2 descr", priority: "2", status: "2", creator: 0, responsible: 2},
    {id: 2, name: "task3", description: "task3 descr", priority: "3", status: "3", creator: 0, responsible: 3}
  ]);
};
