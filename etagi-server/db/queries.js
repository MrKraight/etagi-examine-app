const knex = require("./knex");

module.exports = {
    getUserByName:(userName) => {
        return new Promise((resolve, reject) =>{
            knex('users')
                .where({
                    name: userName
                })
                .select("*")
                .then(rows => resolve(rows[0]))
                .catch(err => reject(err))
                //.catch(err => reject(err));
        })
    },
    getUserById: (userId) => {
        return new Promise((resolve, reject) =>{
            knex('users')
                .where({
                    id: userId
                })
                .select("*")
                .then(rows => resolve(rows[0]))
                .catch((err) => reject(err))
        })
    },
    getAllTasks: () => {
        return new Promise((resolve, reject) =>{
            knex('tasks')
                .select("*")
                .then(rows => resolve(rows))
                .catch((err) => reject(err))
        })
    },
    insertTask: (task) =>{
        return new Promise((resolve, reject) =>{
            knex('tasks')
                .insert(task)
                .then((data) => {console.log(data); resolve();})
                .catch((err) => {console.log(err); reject(err);})
        }) 
    },
    updateTask: (taskid, task)=>{
        return new Promise((resolve, reject) =>{
            knex('tasks')
                .where({id: taskid})
                .update(task)
                .then(resolve())
                .catch((err) => reject(err))
        }) 
    },
    getUsersForSupervisor: (supervisorId) =>{
        return new Promise((resolve, reject) =>{
            knex('users')
                .where({
                    supervisor: supervisorId
                })
                .select("*")
                .then(rows => resolve(rows))
                .catch((err) => reject(err))
        })
    }
}