import React, { Component } from "react";
import Routes from "./Routes"
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";


class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar id="the-navbar" bg="light" expand="lg">
          <Navbar.Brand className="app-header" href="#home">
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="">
              <LinkContainer to="/signup">
                <Nav.Link activeClassName="selected" href="/signup">Signup</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link activeClassName="selected" href="/login">Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
