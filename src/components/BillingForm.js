import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import "./BillingForm.css";

class BillingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      storage: "",
      isProcessing: false,
      isCardComplete: false
    };
  }

  validateForm() {
    return (
      this.state.name !== "" &&
      this.state.storage !== "" &&
      this.state.isCardComplete
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    });
  }

  handleSubmitClick = async event => {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ isProcessing: true });

    const { token, error } = await this.props.stripe.createToken({ name });

    this.setState({ isProcessing: false });

    this.props.onSubmit(this.state.storage, { token, error });
  }

  render() {
    const loading = this.state.isProcessing || this.props.loading;

    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <Form.Group variant="large" controlId="storage">
          <Form.Label>Storage</Form.Label>
          <Form.Control
            min="0"
            type="number"
            value={this.state.storage}
            onChange={this.handleFieldChange}
            placeholder="Number of notes to store"
          />
        </Form.Group>
        <hr />
        <Form.Group variant="" controlId="name">
          <Form.Label>Cardholder&apos;s name</Form.Label>
          <Form.Control
            type="text"
            value={this.state.name}
            onChange={this.handleFieldChange}
            placeholder="Name on the card"
          />
        </Form.Group>
        <Form.Label>Credit Card Info</Form.Label>
        <CardElement
          className="card-field"
          onChange={this.handleCardFieldChange}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
          }}
        />
        <LoaderButton
          className="btn-block"
          type="submit"
          text="Purchase"
          isLoading={loading}
          loadingText="Purchasing…"
          disabled={!this.validateForm()}
        />
      </form>
    );
  }
}

export default injectStripe(BillingForm);
