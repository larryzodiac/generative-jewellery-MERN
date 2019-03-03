/*
  Evan MacHale - N00150552
  03.03.19
  Signin.js
  + + + + + + + + + + +
  + World Map 🌀
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin      <--- You are here 🚀
  +       ¬ Signup
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
// Material Design Components

/*
  Signin renders a form + handles POST requests 🔒
*/

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <p>Now we are rendering the sign in form</p>
      </React.Fragment>
    );
  }
}

export default Signin;
