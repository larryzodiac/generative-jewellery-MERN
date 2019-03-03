/*
  Evan MacHale - N00150552
  03.03.19
  Signup.js
  + + + + + + + + + + +
  + World Map 🌀
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin
  +       ¬ Signup      <--- You are here 🚀
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material Design Components

/*
  Signup renders a form + handles POST requests 🔒
*/

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { switchPortal } = this.props;
    return (
      <React.Fragment>
        <p>Now we are rendering the sign up form</p>
        <p>
          Already have an account?
          <button type="button" onClick={switchPortal}>Sign in</button>
        </p>
      </React.Fragment>
    );
  }
}

Signup.propTypes = {
  switchPortal: PropTypes.func
};

// Specifies the default values for props:
Signup.defaultProps = {
  switchPortal: null
};

export default Signup;
