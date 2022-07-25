import axios from 'axios';
axios.defaults.withCredentials = true

class RouteService{
    login(user, password){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:5000/api/users/auth`, { username: user, password: password })
            .then(res => {
              console.log(res.data);
              resolve({error: false, data: res.data})
            }).catch(err =>{
              console.log(err.response.data);
              reject({error: true, data: err.response.data})
            })
        })
    }

    getUser(){
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:5000/api/users/user`)
            .then(res => {
                console.log(res.data);
                resolve({error: false, data: res.data})
            }).catch(err =>{
                console.log(err.response.data);
                reject({error: true, data: err.response.data})
            })
        })
    }

    logout(){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:5000/api/users/deAuth`)
            .then(() => {
                console.log("trying logout 1.5")
                resolve()
            })
            .catch(err =>{
                console.log("trying logout 1.5 error")
                console.log(err.response);
                reject(err);
            })
        })
    }

    getTasks(){
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:5000/api/tasks/`)
            .then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch(err =>{
                console.log(err.response);
                reject(err);
            })
        })
    }

    insertTask(task){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:5000/api/tasks/insert`, task)
            .then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch(err =>{
                console.log(err.response);
                reject(err);
            })
        })
    }

    updateTask(task, id){
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:5000/api/tasks/update`, {task: task, taskId: id})
            .then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch(err =>{
                console.log(err.response);
                reject(err);
            })
        })
    }

    getSupervisorTasks(task, id){
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:5000/api/tasks/supervisorTasks`)
            .then((response) => {
                console.log(response);
                resolve(response)
            })
            .catch(err =>{
                console.log(err.response);
                reject(err);
            })
        })
    }
}

export default new RouteService();