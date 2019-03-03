/*
  Evan MacHale - N00150552
  03.03.19
  App.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
// React-Router-Dom
import { HashRouter } from 'react-router-dom';
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
      isLoggedin: false
    };
  }

  render() {
    const { isLoggedin } = this.state;
    return (
      <HashRouter>
        {!isLoggedin ? <Portal /> : <World />}
      </HashRouter>
    );
  }
}

export default App;
