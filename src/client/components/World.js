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
import PropTypes from 'prop-types';
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
    const { id } = this.props;
    const { setLoginSuccess } = this.props;
    return (
      <React.Fragment>
        <h2>Welcome to World</h2>
        {id ? <h2>{id}</h2> : <p>error</p>}
      </React.Fragment>
    );
  }
}

World.propTypes = {
  id: PropTypes.string,
  setLoginSuccess: PropTypes.func
};

// Specifies the default values for props:
World.defaultProps = {
  id: '',
  setLoginSuccess: null
};

export default World;
