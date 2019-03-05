import React, { Component } from 'react';
import './App.css';
import GameCanvas from './GameCanvas.js'
import NavBar from './ReactComponents/NavBar.js'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, tokenLogin, clearUser, register } from './actions'


class App extends Component {

  signup = (username, password, confirmpassword) => {
    if (password===confirmpassword){
      this.props.register(username, password)
    }else{
      console.log("Passwords do not match")
    }
  }
  logout = (event) => {
    event.preventDefault()
    this.props.clearUser()
    localStorage.removeItem("token")
    this.props.history.push('/')
  }

  login = (username, password) => {
    this.props.login(username, password)
  }

  componentDidMount(){
    let token = localStorage.getItem("token")
    if(token){
      this.props.tokenLogin(token)
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar login={this.login} signup={this.signup} logout={this.logout} user={this.props.user}/>
        <GameCanvas user={this.props.user} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  register: (username, password) => dispatch(register(username, password)),
  tokenLogin: (token) => dispatch(tokenLogin(token)),
  clearUser: () => dispatch(clearUser())
})

const mapStateToProps = state => ({
  user: state.user.user
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
