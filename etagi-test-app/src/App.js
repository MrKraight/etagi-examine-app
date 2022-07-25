import { useState, useRef, useEffect } from 'react';
import './App.css';
import TaskList from './TaskList';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RouteService from './routeService';
import Alert from 'react-bootstrap/Alert';

function App() {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginError, setLoginError] = useState(null);
  const [isAuth, setIsAuth] = useState(true);
  const [userData, setUserData] = useState(null);

  const tryAuth = () =>{
    RouteService.login(loginRef.current.value, passwordRef.current.value).then(
      response => {
        console.log(response);
        setUserData(response.data);
        setLoginError(null);
        setIsAuth(false);
      }, 
      error => {
        console.log(error.data.message);
        setLoginError(error.data.message);
      });
  }

  const deAuth = () =>{
    RouteService.logout().then(
      () => {
        setUserData(null);
        setIsAuth(true)
      },
      err =>{
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("ready to mount");
    RouteService.getUser().then(
      response => {
        console.log(response);
        if(response.data.name){
          setLoginError(null);
          setUserData(response.data);
          setIsAuth(false);
        }
      }, 
      error => {
        console.log(error.data.message);
        setLoginError(error.data.message);
      });
  }, []);
  
  return (
    <div className="p-3">
      { isAuth &&
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control ref={loginRef} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" onClick={() => tryAuth()}>
          Submit
        </Button>
        { loginError != null &&
          <Alert variant="danger">
              {loginError}
          </Alert>
        }
      </Form>
    }
    { !isAuth &&
      <div>
        <h2>Здравствуйте, {userData.name}</h2>
        <TaskList userId={userData}></TaskList>
        <Button variant="primary" className="m-3" onClick={ () => deAuth()}>
          Выйти
        </Button>
      </div>
    }
    </div>
  );
}

export default App;
