import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "", 
      loginErrors: ""
    }
  }

  handleChange = (e) => {
    console.log('handle change', e)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {

    const {
      email, 
      password
    } = this.state

    axios.post("https://lfc-portal-api.herokuapp.com/sessions", {
    // axios.post("http://localhost:3000/sessions", {
      user: {
        email: email, 
        password: password
      }
    }, 
    { withCredentials: true }
    ).then(resp => {
      if (resp.data.logged_in) {
        this.props.handleSuccessfulAuth(resp.data)
      }
    }).catch(error => {
      console.log('---login error', error)
    })
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}
