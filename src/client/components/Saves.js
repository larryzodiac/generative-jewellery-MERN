/*
  Evan MacHale - N00150552
  11.03.19
  Saves.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World
  +       ¬ Playground
  +       ¬ Saves       <--- You are here 🚀
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material Design Components
// My Components

/*
  Playground functions as container for Three.js Scene Component
*/

class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        Hello Saves
      </React.Fragment>
    );
  }
}

Saves.propTypes = {};

export default Saves;
