import React, { Component } from "react";
import { Form,
         FormGroup,
         FormControl,
         FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { API } from "aws-amplify";


export default class NewNote extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    console.log('handleSubmit.event:::', event)

    this.setState({ isLoading: true });

    try {
      await this.createNote({
        content: this.state.content
      });
      this.props.history.push("/");
    } catch (e) {
      console.log("error", e)
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createNote(note) {
    console.log('NewNote.note:', note)
    return API.post("notes", "/notes", {
      body: note
    });
  }


  render() {
    return (
      <div className="NewNote">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <Form.Control
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
              as="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <FormLabel>Attachment</FormLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}


// <div className="NewNote">
//   <form onSubmit={this.handleSubmit}>
//     <FormGroup controlId="content">
//       <FormControl
//         onChange={this.handleChange}
//         value={this.state.content}
//         componentClass="textarea"
//       />
//     </FormGroup>
//     <FormGroup controlId="file">
//       <FormLabel>Attachment</FormLabel>
//       <FormControl onChange={this.handleFileChange} type="file" />
//     </FormGroup>
//     <LoaderButton
//       block
//       bsStyle="primary"
//       bsSize="large"
//       disabled={!this.validateForm()}
//       type="submit"
//       isLoading={this.state.isLoading}
//       text="Create"
//       loadingText="Creating…"
//     />
//   </form>
// </div>
