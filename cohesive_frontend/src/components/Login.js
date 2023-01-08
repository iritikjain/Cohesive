import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
  username: '', password: ''
  })

  const login = async() => {
    await fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then( data => data.json() )
    .then(
      data => {
        props.userLogin(data.token);
        window.localStorage.setItem("token", data.token);
        window.alert("Successful Login !");
        navigate("/");
      }
    )
    .catch( error => console.error(error))
  }

  const inputChanged1 = event => {
    setCredentials({...credentials, username: event.target.value});
  }

  const inputChanged2 = event => {
    setCredentials({...credentials, password: event.target.value});
  }

  return (
      <div className="login square border border-info rounded-4">
        <p className="text-center fw-bold">Sign In</p>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter User Name" 
            value={credentials.username} onChange={inputChanged1} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Enter Password" 
            value={credentials.password} onChange={inputChanged2} />
          </Form.Group>

          <Form.Text className="text ">
            <p>Not Have An Account? <Link to="/register">Sign Up</Link> Now!</p> 
          </Form.Text>

          <Button variant="primary" onClick={login} >
            Login
          </Button>
        </Form>
      </div>
  );
};

export default Login;
