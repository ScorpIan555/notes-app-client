import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
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
      console.log('AUTH object at login1::: ', Auth)
      console.log('AUTH object at login1::: ', JSON.stringify(Auth))

      await Auth.signIn(this.state.email, this.state.password);
        console.log('AUTH object at login2 (after sig)::: ', Auth)
        console.log('AUTH object at login1::: ', JSON.stringify(Auth))
        console.log('verifiedContact', Auth)
        this.props.userHasAuthenticated(true);
        this.props.history.push("/");

    } catch (e) {
      alert(e.message);
      console.log('AUTH object at login2 (after sig)::: ', Auth)
      console.log('AUTH object at login1::: ', JSON.stringify(Auth))
      this.setState({ isLoading: false });
    }
  }


  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" variant="large">
            <FormLabel className="label login-form-label">Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" variant="large">
            <FormLabel className="label login-form-label">Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
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
