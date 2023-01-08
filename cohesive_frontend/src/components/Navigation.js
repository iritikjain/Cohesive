import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../static/logo.png";
import "../App.css";
import { NavLink } from "react-router-dom";

const Navigation = (props) => {
  
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Navbar.Brand><NavLink className="app-logo" exact to = "/">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-center"
          />{" "}
          Money Tracker
          </NavLink>
          </Navbar.Brand>
          </Nav>
          <Nav className="me-5">
            <Nav.Link><NavLink exact to="/" activeClassName="activeClicked" className="nav-options">Home</NavLink></Nav.Link>
            <Nav.Link><NavLink exact to="/friends" activeClassName="activeClicked" className="nav-options">Friends</NavLink></Nav.Link>
            <Nav.Link><NavLink exact to="/transactions" activeClassName="activeClicked" className="nav-options">Transactions</NavLink></Nav.Link>
            {props.token?(<Nav.Link><NavLink onClick={() => { props.userLogout(); window.localStorage.removeItem("token"); window.alert("Successful Logout !"); }} activeClassName="activeClicked" exact to="/" className="nav-options">Logout</NavLink></Nav.Link>):(<Nav.Link><NavLink exact to="/login" activeClassName="activeClicked" className="nav-options">Login</NavLink></Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
