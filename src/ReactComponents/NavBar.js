//Login forms and switching between the game and highscores

import React, { Component, Fragment } from 'react';
import { Navbar, Form, InputGroup, Button, Pagination, Nav } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from 'react-router-dom'

class NavBar extends Component {
  state={username: "", password: "", confirmpassword:"", formtype: "login"}

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.formtype==="login"){
      this.props.login(this.state.username, this.state.password)
    }
    if (this.state.formtype==="register"){
      this.props.signup(this.state.username, this.state.password, this.state.confirmpassword)
    }
  }

  handleFormChange = (e) => {
    e.preventDefault()
    e.persist()
    this.setState(prevState => {
      return {[e.target.name]: e.target.value}
    })
  }

  handlePagination = (e, value) => {
    this.setState({formtype: value})
  }

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        {(Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object) && <Fragment>
        <Form onSubmit={(e) => this.handleSubmit(e)} inline>
          {(this.state.formtype==="login") && <InputGroup>
            <Nav className="mr-auto">
              <LinkContainer exact={true} to='/'>
                <Nav.Link href="#">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/highscores'>
                <Nav.Link href="#">Highscores</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.username}
              className="user-input"
              name="username"
              onChange={(e) => this.handleFormChange(e)}
            />
            <Form.Control
              type="password"
              value={this.state.password}
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              className="user-input"
              name="password"
              onChange={(e) => this.handleFormChange(e)}
            />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </InputGroup>}
          {(this.state.formtype==="register") &&
          <Fragment>
            <InputGroup>

              <Nav className="mr-auto">
                <LinkContainer exact={true} to='/'>
                  <Nav.Link href="#">Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/highscores'>
                  <Nav.Link href="#">Highscores</Nav.Link>
                </LinkContainer>
              </Nav>
              <Form.Control
                placeholder="Username"
                value={this.state.username}
                className="user-input"
                name="username"
                onChange={(e) => this.handleFormChange(e)}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                className="user-input"
                name="password"
                onChange={(e) => this.handleFormChange(e)}
              />
              <Form.Control
                type="password"
                placeholder="Confirm password"
                className="user-input"
                name="confirmpassword"
                onChange={(e) => this.handleFormChange(e)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </InputGroup>
          </Fragment>
          }
        </Form>
        <Pagination onChange={e=>this.handlePagination(e)}>
          <Pagination.Item onClick={e=>this.handlePagination(e, "login")} active={this.state.formtype==="login"}>Login</Pagination.Item>
          <Pagination.Item onClick={e=>this.handlePagination(e, "register")} active={this.state.formtype==="register"}>Register</Pagination.Item>
        </Pagination></Fragment>
        }
        {!(Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object) && <Fragment>
            <Navbar.Brand>
              Welcome {this.props.user.username}
            </Navbar.Brand>
            <Nav className="mr-auto">
              <LinkContainer exact={true} to='/'>
                <Nav.Link href="#">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/highscores'>
                <Nav.Link href="#">Highscores</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/myhighscores'>
                <Nav.Link href="#">My Highscores</Nav.Link>
              </LinkContainer>
              <Nav.Link href="#" onClick={(event) => this.props.logout(event)}>Log out</Nav.Link>
            </Nav>
        </Fragment>}
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
