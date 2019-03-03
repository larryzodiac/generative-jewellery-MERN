/*
  Evan MacHale - N00150552
  03.03.19
  Portal.js
  + + + + + + + + + + +
  + World Map 🌀
  + Index
  +   ¬ App
  +     ¬ Portal        <--- You are here 🚀
  +       ¬ Signin
  +       ¬ Signup
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
// Material Design Components
import { Grid } from '@material/react-layout-grid';
// My Components
import Signin from './Signin';
import Signup from './Signup';

/*
  Portal renders registration fields 🔒
*/

class Portal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: true
    };
    this.switchPortal = this.switchPortal.bind(this);
  }

  // Toggle between forms
  switchPortal() {
    this.setState(prevState => ({
      signup: !prevState.signup
    }));
  }

  render() {
    const { signup } = this.state;
    return (
      <Grid>
        <p>Hello landing page!</p>
        { signup ? <Signup switchPortal={this.switchPortal} /> : <Signin switchPortal={this.switchPortal} /> }
      </Grid>
    );
  }
}

export default Portal;
