import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useEffect, useState } from "react";

import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import NotFound from './NotFound';

import './App.css';

function App() {
  const [ searchString, setSearchString ] = useState("");
  
  handleSubmit((e) => {
      e.preventDefault();

      let history = useHistory();
      history.push(`/restaurants?borough=${searchString}`);
      searchString = "";
    }
  );
  return (
  <>
    <Navbar bg="light" expand="lg">
      <LinkContainer to="/">
        <Navbar.Brand>New York Restaurants</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/restaurants">
            <Nav.Link>Full List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/about">
            <Nav.Link>About</Nav.Link>
          </LinkContainer> 
        </Nav>
        <Form onSubmit={handleSubmit} inline>
          <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <Container>
      <Row>
        <Column>
          <Switch>
            <Route exact path='/'>
              <Restaurants />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/Restaurants'>
              <Restaurants />
            </Route>
            <Route path='/Restaurant/:id'>
            </Route>
          </Switch>
        </Column>
      </Row>
    </Container>
      <br />
  </>

  );
}

export default App;
