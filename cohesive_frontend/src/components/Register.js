import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '', email: '', password: ''
    })

  const register = async() => {
    await fetch('http://127.0.0.1:8000/user/',  {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then( data => data.json() )
    .then(alert("Successful Registration ! You Can Now Login !"))
    .then(navigate("/login")
    )
    .catch( error => console.error(error))
  }

  const inputChanged1 = event => {
    setCredentials({...credentials, username: event.target.value});
  }

  const inputChanged2 = event => {
    setCredentials({...credentials, email: event.target.value});
  }

  const inputChanged3 = event => {
    setCredentials({...credentials, password: event.target.value});
  }

  return (
    <div className="signup square border border-info rounded-4">
      <p className="text-center fw-bold">Sign Up</p>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter User Name" 
          value={credentials.username} onChange={inputChanged1} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter Email ID" 
          value={credentials.email} onChange={inputChanged2} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter Password" 
          value={credentials.password} onChange={inputChanged3} />
        </Form.Group>

        <Form.Text className="text ">
          <p>Already Have An Account? <Link to="/login">Login</Link> Now!</p> 
        </Form.Text>

        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;