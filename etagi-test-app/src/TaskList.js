import React, { useState, useRef, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import routeService from "./routeService";

function TaskList(userData) {
    const [show, setShow] = useState(false);
    const [popupText, setPopupText] = useState("Добавить задачу");

    const nameRef = useRef(null);
    const priorityRef = useRef(null);
    const finishesAtRef = useRef(null);
    const responsibleRef = useRef(null);
    const statusRef = useRef(null);
    let taskId = useRef(null);

    let [tasks, setTasks] = useState(null);

    useEffect(() => {
      routeService.getTasks().then(
        response => {
          setTasks(response.data);
        });
    }, []);

    const filterFunc = (event) =>{
      switch(event.target.value){
        case("1"):{
          const sortedTasks = [...tasks].sort((a,b) =>{
            return Date.parse(b.updated_at) - Date.parse(a.updated_at);
          })
          setTasks(sortedTasks);
        }break;
        case("2"):{
          routeService.getSupervisorTasks().then(
            response => {
              var ids = response.data.map(element => element.id);
              console.log(ids);
              const sortedTasks = [...tasks].filter((task) => ids.includes(task.id));
              setTasks(sortedTasks);
            });
        }break;
        case("3"):{
          console.log(userData.userId.id);
          const sortedTasks = [...tasks].filter((task) => task.responsible == userData.userId.id)
          .sort((a,b) =>{
            return Date.parse(b.finishes_at) - Date.parse(a.finishes_at);
          });
          setTasks(sortedTasks);
        }break;
      }
    }

    const getElementColor = (task) =>{
      console.log(task);
      if(task.status == 3)
        return "text-success";
      if(task.status != 3 && new Date() - Date.parse(task.finishes_at) > 0)
        return "text-danger";
      return "";
    }

    const handleClose = () => setShow(false);
    const handleShow = (task) => {
      setShow(true);
      if(!task){
        setPopupText("Добавить задачу");
      }
      else{
        taskId.current = task.id;
        console.log("taskId");
        console.log(taskId);
        setPopupText("Редактировать задачу "+  task.name);
      }
    };

    const dateFormat = (date) => {
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    }

    const save = async () => {
      var newTask = {
        name: nameRef.current.value,
        description: "no description",
        priority: priorityRef.current.value,
        finishes_at: finishesAtRef.current.value,
        updated_at: dateFormat(new Date()),
        responsible: responsibleRef.current.value,
        status: statusRef.current.value
      }

      if(popupText === "Добавить задачу"){
        await routeService.insertTask(newTask);
      }
      else{
        console.log("taskId");
        console.log(taskId.current);
        await routeService.updateTask(newTask, taskId.current);
      }
      routeService.getTasks().then(
        response => {
          setTasks(response.data);
        });
      setShow(false);
    } 

    const transformPriorities = new Map();
    transformPriorities.set(1, "Низкий");
    transformPriorities.set(2, "Средний");
    transformPriorities.set(3, "Высокий");

    const transformStatus = new Map();
    transformStatus.set(1, "К выполнению");
    transformStatus.set(2, "Выполняется");
    transformStatus.set(3, "Выполнена");
    transformStatus.set(4, "Отменена");

    return (
      <div className="p-3">
        <Form.Select className="w-25 mb-3 mt-3" onChange={filterFunc}>
          <option value="1">По дате последнего обновления</option>
          <option value="2">Только подчиненных (если я - руководитель)</option>
          <option value="3">Мои, по дате завершения</option>
        </Form.Select>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Приоритет</th>
              <th>Дата окончания</th>
              <th>Ответственный</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks.map(task => (
              <tr key={task.id} onClick={() => handleShow(task)}>
                <td className={task.status == 3 ? "text-success" : new Date() - Date.parse(task.finishes_at) > 0 ? "text-danger" : ""}>{task.name}</td>
                <td>{transformPriorities.get(task.priority)}</td>
                <td>{task.finishes_at}</td>
                <td>{task.responsible}</td>
                <td>{transformStatus.get(task.status)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={() => handleShow(null)}>
          Добавить Задачу
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{popupText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Label>Заголовок</Form.Label>
        <Form.Control ref={nameRef} type="text"/>
        <Form.Label>Приоритет</Form.Label>
        <Form.Select ref={priorityRef} type="text">
          <option value="1">{transformPriorities.get(1)}</option>
          <option value="2">{transformPriorities.get(2)}</option>
          <option value="3">{transformPriorities.get(3)}</option>
        </Form.Select>
        <Form.Label>Дата окончания</Form.Label>
        <Form.Control ref={finishesAtRef} type="date"/>
        <Form.Label>Ответственный</Form.Label>
        <Form.Control ref={responsibleRef} type="text"/>
        <Form.Label>Статус</Form.Label>
        <Form.Select ref={statusRef} type="text">
          <option value="1">{transformStatus.get(1)}</option>
          <option value="2">{transformStatus.get(2)}</option>
          <option value="3">{transformStatus.get(3)}</option>
          <option value="4">{transformStatus.get(4)}</option>
        </Form.Select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={save}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

export default TaskList;