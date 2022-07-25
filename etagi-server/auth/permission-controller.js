const dbQueries = require('../db/queries');

module.exports = {
    async prepareTaskData(taskdata, userId){
        //если пользователь не является создателем, то он может изменить только статус
        if(taskdata.creator == userId){
            dbQueries.getUsersForSupervisor(userId)
                .then(data => {
                    //епользователь может указать в качестве ответственного только своих подчиненных
                    if(data && data.some(element => element.id == taskdata.responsible)){
                        return taskdata;
                    }else{
                        delete taskdata.responsible;
                        return taskdata;
                    }
                });
        }
        else{
            return {status: taskdata.status};
        }
    }
}