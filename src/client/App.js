/*
  Evan MacHale - N00150552
  03.03.19
  App.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App             <--- You are here 🚀
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
import axios from 'axios';
// React-Router-Dom
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
// My Components
import Portal from './components/portal/Portal';
import World from './components/world/World';
import './App.scss';

/*
  App functions as the hub for all component traffic 🚂
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
      id: ''
      // loginSuccess: true,
      // id: '5c7aa39d7ce8432c1884a1e4'
    };
    this.setLoginSuccess = this.setLoginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.get('api/users/session')
      .then((response) => {
        console.log(response);
        // if respones.data set id + loginSuccess?
        // Maybe use JWT?
        // this.setState({ weights: response.data.weights });
      })
      .catch(error => console.log(error));
  }

  setLoginSuccess(token) {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess,
      id: token
    }));
  }

  logout() {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess,
      id: ''
    }));
  }

  render() {
    const { loginSuccess } = this.state;
    const { id } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Route path="/portal" render={props => <Portal {...props} setLoginSuccess={this.setLoginSuccess} />} />
          <Route
            exact
            path="/"
            render={() => (
              !loginSuccess ? (
                <Redirect to="/portal" />
              ) : (
                <World loginSuccess={loginSuccess} setLoginSuccess={this.setLoginSuccess} id={id} logout={this.logout} />
              )
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
