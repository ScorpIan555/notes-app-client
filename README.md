This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes App Client refactored into Bootstrap 4 & React-Bootstrap v1.0.5 (beta)

https://serverless-stack.com/


Official demo app in Bootstrap 3:
https://demo.serverless-stack.com/

Unofficial demo app in Bootstrap 4:
https://sls-stack-bootstrap4-notesapp.netlify.com/


### `Notes on observed changes:`


  React-Boostrap v1 migration notes:
    https://react-bootstrap.netlify.com/migrating/
  Bootstrap 4 migration notes:
    https://getbootstrap.com/docs/4.0/migration/

1)  Bootstrap 3 used LESS to SASS for CSS source files.
1)  App.js -- <NavItem> no longer supported  ==>   <Nav.Link>
2)  App.js -- Bootstrap 4 no longer provides a navbar-default option, which breaks the <Navbar> component ==>  added #the-navbar id to the <Navbar> component for styling
3)  "removed fluid, use your own Container component in."  ==> removed fluid command from <Navbar>
4)  NavbarHeader# removed, not present in v4  ==>  field eliminated
5)  <ControlLable> no longer supported  ==>   <FormLabel>
6)  <HelpBlock> no longer supported  ==>   <Form.Text>
7)  Glyphicon no longer supported  ==>
8)  bsSize="large" no longer supported: console warning  ==> delete this property completely, use "block" prop in component or className="btn-block" (I've used the latter as a preference)
        for any button styling, use variant="some-style-property"
9) <PageHeader> no longer supported ==> added styles to Home.css
10) <ListGroupItem> still functions (without default style), however the docs use ListGroup.Item   ==>  <ListGroup.Item>, added styles to Home.css, and used 'action' command/prop provided by react-bootstrap
11) Spinners:
        https://github.com/react-bootstrap/react-bootstrap/issues/3539
        https://react-bootstrap.netlify.com/components/spinners/
12) <FormGroup>/<FormControl> ==>  <Form.Group>/<Form.Control>
13)  componentClass prop no longer supported ==>  using 'as' prop instead
14) Notes.js -- <FormControl.Static> no longer supported ==> wrapped link n Form.Group component
