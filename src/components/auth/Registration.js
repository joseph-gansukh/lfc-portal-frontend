import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "", 
      password_confirmation: "", 
      registrationErrors: ""
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
      password, 
      password_confirmation
    } = this.state

    axios.post("http://localhost:3000/registrations", {
      user: {
        email: email, 
        password: password,
        password_confirmation: password_confirmation
      }
    }, 
    { withCredentials: true }
    ).then(resp => {
      console.log('---registration resp', resp)
    }).catch(error => {
      console.log('---registration error', error)
    })
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
          <input type="password" name="password_confirmation" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.handleChange} required/>
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}
