const express = require('express')
const router = express.Router()
const dbQueries = require('../../db/queries');
const permissionController = require("../../auth/permission-controller");

//Получить список задач 
router.get('/',(req,res) => {
    if(req.user){
        dbQueries.getAllTasks()
            .then(tasks => res.send(tasks)) 
            .catch(err=> res.send(err));
    }
});

router.get('/supervisorTasks',(req,res) => {
    dbQueries.getUsersForSupervisor(req.user.id)
        .then(data => res.send(data))
        .catch(err=> res.send(err)); 
});
//Добавить задачу
router.post('/insert', (req, res) => {
    if(req.user){
        dbQueries.getUsersForSupervisor(req.user.id)
            .then(data => {
                if(data && data.some(element => element.id == taskdata.responsible)){
                    req.body.creator = req.user.id;
                    dbQueries.insertTask(req.body)
                        .then(res.send("Success"))
                        .catch(err=> res.send(err)); 
                }
                else{
                    //эту логику нужно вынести в permission controller, но пока что тут
                    res.status(500).send("Нельзя указывать в качестве ответственного тех, у кого не являешься исполнителем");
                }
            })
            .catch(err=> console.log(err));
    }
    else{
        console.log("unauthorized query");
    }
})
//обновить задачу
router.post('/update', (req, res) => {
    if(req.user){
        permissionController.prepareTaskData(req.body.task, req.user.id).then(taskData => {
        dbQueries.updateTask(req.body.taskId, taskData)
            .then(res.send("Success"))
            .catch(err=> res.send(err)); 
        })
        .catch(err=> console.log(err)); 
    }
    else{
        console.log("unauthorized query");
    }
})

module.exports = router