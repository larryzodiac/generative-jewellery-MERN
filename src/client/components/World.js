/*
  Evan MacHale - N00150552
  06.03.19
  World.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World         <--- You are here 🚀
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
// React-Router-Dom
// import { BrowserRouter } from 'react-router-dom';
// My Components

/*
  World functions as 
*/

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <h2>Welcome to World</h2>
      </React.Fragment>
    );
  }
}

export default World;
