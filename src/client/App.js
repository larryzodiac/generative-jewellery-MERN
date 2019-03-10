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
// React-Router-Dom
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
// My Components
import Portal from './components/portal/Portal';
import World from './components/World';
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
    };
    this.setLoginSuccess = this.setLoginSuccess.bind(this);
  }

  setLoginSuccess(token) {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess,
      id: token
    }));
    console.log(token);
    console.log(this.state.loginSuccess);
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
                <World loginSuccess={loginSuccess} setLoginSuccess={this.setLoginSuccess} id={id} />
              )
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
