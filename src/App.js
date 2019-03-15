import React, { Component, Fragment } from "react";
import Routes from "./Routes"
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from 'aws-amplify';
import "./App.css";



class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    isAuthenticated: false,
    isAuthenticating: false
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    
    this.props.history.push("/login");
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    console.log("<App /> this:::", this)
    console.log("<App /> this.props:::", this.props)
    // console.log("<App /> this.props:::", this)
    // activeKey={this.props.location.pathname}
    console.log("<App /> this.props.location:::", this.props.location)
    // console.log("<App /> this.props.location.pathname:::", this.props.location.pathname)


    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar id="the-navbar" bg="light" expand="md">
          <Navbar.Brand as="ul" className="app-header" href="#home">
            <Link className="navbar-link" to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="" >
              {this.state.isAuthenticated
                ? <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                : <Fragment>


                    <LinkContainer to="/signup">
                      <Nav.Link className="">Signup</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <Nav.Link>Login</Nav.Link>
                    </LinkContainer>


                  </Fragment>
                }
            </Nav>
          </Navbar.Collapse>
        </Navbar >
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
