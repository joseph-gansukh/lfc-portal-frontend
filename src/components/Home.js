import React, { Component } from 'react'
import Registration from './auth/Registration'
import axios from 'axios'
import Login from './auth/Login'

export default class Home extends Component {
  constructor(props) {
    super(props) 
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data)
    this.props.history.push('/dashboard')
  }

  handleLogoutClick() {
    axios.delete('https://lfc-portal-api.herokuapp.com/logout', {withCredentials: true})
    // axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(resp => {
      this.props.handleLogout()
    }).catch(error => {
      console.log("---logout error", error)
    })
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
      </div>
    )
  }
}
