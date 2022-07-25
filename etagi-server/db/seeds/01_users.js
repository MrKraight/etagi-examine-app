/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const encrypt = require("../encrypt");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del();
  await knex('users').del();
  await knex('users').insert([
    {id: 0, name: "rukovoditel", surname: "rukovoditel", patronymic: "rukovoditel", password: await encrypt.passwordEncrypt("12345")},
    {id: 1, name: "user", surname: "user", patronymic: "user", password: await encrypt.passwordEncrypt("12345"), supervisor: 0},
    {id: 2, name: "user2", surname: "user2", patronymic: "user2", password: await encrypt.passwordEncrypt("12345"), supervisor: 0},
    {id: 3, name: "user3", surname: "user3", patronymic: "user3", password: await encrypt.passwordEncrypt("12345")},
  ]);
};
