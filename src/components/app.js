import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './Home';
import Dashboard from './Dashboard';
import axios from 'axios'

export default class App extends Component {
  constructor() {
    super() 

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: "LOGGED_IN", 
      user: data.user
    })
  }

  hanldeLogout = () => {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN", 
      user: {}
    })
  }

  checkLoginStatus = () => {
    axios.get("https://lfc-portal-api.herokuapp.com/logged_in", {withCredentials: true})
    // axios.get("http://localhost:3000/logged_in", {withCredentials: true})
    .then(resp => {
      if (resp.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: resp.data.user
        })
      } else if (!resp.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} render={props => (
              <Home {...props} hanldeLogout={this.hanldeLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
            <Route exact path={"/dashboard"} render={props => (
              <Dashboard {...props} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
