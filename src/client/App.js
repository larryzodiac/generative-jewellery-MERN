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
import { BrowserRouter } from 'react-router-dom';
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
      loginSuccess: false
    };
    this.setLoginSuccess = this.setLoginSuccess.bind(this);
  }

  setLoginSuccess() {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess
    }));
  }

  render() {
    const { loginSuccess } = this.state;
    return (
      <BrowserRouter>
        {!loginSuccess ? <Portal setLoginSuccess={this.setLoginSuccess} /> : <World />}
      </BrowserRouter>
    );
  }
}

export default App;
