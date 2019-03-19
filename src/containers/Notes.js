import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import { LoaderButton } from "../components";
import config from "../config";
import "./Notes.css";
import { s3Upload } from "../libs/awsLib";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,
      note: null,
      content: "",
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const note = await this.getNote();
      const { content, attachment } = note;
      console.log('Notes.componentDidMount.note', note)
      console.log('Notes.componentDidMount.content', content)
      console.log('Notes.componentDidMount.this.state', this.state)

      if (attachment) {
        attachmentURL = await Storage.vault.get(attachment);
      }
      console.log('attachmentURL::', attachmentURL)
      this.setState({
        note,
        content,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getNote() {
    return API.get("notes", `/notes/${this.props.match.params.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  saveNote(note) {
    return API.put("notes", `/notes/${this.props.match.params.id}`, {
      body: note
    });
  }

  handleSubmit = async event => {
    let attachment;

    event.preventDefault();

    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    this.setState({ isLoading: true });

    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }

      await this.saveNote({
        content: this.state.content,
        attachment: attachment || this.state.note.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  deleteNote() {
    return API.del("notes", `/notes/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteNote();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }


  render() {
    return (
      <div className="Notes">
        {this.state.note &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <Form.Control
                onChange={this.handleChange}
                value={this.state.content}
                as="textarea"
              />
            </FormGroup>
            {this.state.note.attachment &&
              <FormGroup>
                <Form.Label>Attachment</Form.Label>
                  <Form.Group>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={this.state.attachmentURL}
                    >
                      {this.formatFilename(this.state.note.attachment)}
                    </a>
                  </Form.Group>
              </FormGroup>}
            <Form.Group controlId="file">
              {!this.state.note.attachment &&
                <Form.Label>Attachment</Form.Label>}
              <Form.Control onChange={this.handleFileChange} type="file"  />
            </Form.Group>
            <LoaderButton
              block
              variant="primary"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              variant="danger"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }

}
