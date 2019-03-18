import React, { Component } from "react";
import { ListGroup, ListGroupItem, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    console.log('Home.componentDidMount()', this.props)
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.notes();

      console.log("notes", notes)

      this.setState({ notes });

    } catch (e) {
      // console.log('e.notes', notes)
      alert(e);
    }
    console.log('this.state.notes', this.state.notes)
    this.setState({ isLoading: false });
  }

  notes() {
    return API.get("notes", "/notes");
  }


  renderNotesList(notes) {
    console.log('NOTES LIST', notes)
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <LinkContainer
              key={note.noteId}
              to={`/notes/${note.noteId}`}
            >
              <ListGroupItem header={note.content.trim().split("\n")[0]}>
                {"Created: " + new Date(note.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>

          : <LinkContainer
              key="new"
              to="/notes/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new note
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }


  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderNotes() {
    console.log('NOTES.renderNotes() from state::: ', this.state.notes)
    console.log('NOTES.isLoading? ::: ', this.state.isLoading)

    return (
      <div className="notes">
        <Form.Label className="page-header">Your Notes</Form.Label>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
    console.log('Home.props.isAuthenticated?', this.props.isAuthenticated)
    console.log('NOTES.isLoading? ::: ', this.state.isLoading)
    console.log('NOTES.renderNotes() from state::: ', this.state.notes)
    console.log('NOTES.renderNotes() from props::: ', this.props.notes)

    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    );
  }
}
