import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      // console.log('AUTH object at login1::: ', Auth)
      // console.log('AUTH object at login1::: ', JSON.stringify(Auth))

      await Auth.signIn(this.state.email, this.state.password);
        console.log('AUTH object at login2 (after sig)::: ', Auth)
        console.log('AUTH object at login1::: ', JSON.stringify(Auth))

        this.props.userHasAuthenticated(true);

    } catch (e) {
      alert(e.message);
      // console.log('AUTH object at login2 (after sig)::: ', Auth)
      // console.log('AUTH object at login1::: ', JSON.stringify(Auth))
      this.setState({ isLoading: false });
    }
  }


  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" variant="large">
            <Form.Label className="label login-form-label">Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" variant="large">
            <Form.Label className="label login-form-label">Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <Button
            block
            className="btn-lg"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
