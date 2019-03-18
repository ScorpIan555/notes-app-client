import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
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
              as="a"
              key={note.noteId}
              to={`/notes/${note.noteId}`}
            >
              <ListGroup.Item action header={note.content.trim().split("\n")[0]}>
                <h4>{note.content.trim().split("\n")[0]}</h4>
                <p>{"Created: " + new Date(note.createdAt).toLocaleString()}</p>
              </ListGroup.Item>
            </LinkContainer>

          : <LinkContainer  className="create-note-link"
              key="new"
              to="/notes/new"
            >
              <ListGroup.Item action >
                <h4>
                  <b>{"\uFF0B"}</b> Create Note
                </h4>
              </ListGroup.Item>
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
        <h1 as="h2" className="page-header">Your Notes</h1>
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
