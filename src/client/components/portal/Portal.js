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
import { Grid, Row, Cell } from '@material/react-layout-grid';
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
      whichPortal: true
    };
    this.switchPortal = this.switchPortal.bind(this);
    // this.newUser = this.newUser.bind(this);
    // this.existingUser = this.existingUser.bind(this);
  }

  // Toggle between forms
  switchPortal() {
    this.setState(prevState => ({
      whichPortal: !prevState.whichPortal
    }));
  }

  // newUser() {
  //   console.log(`Let's create a new user...`);
  //   // Then we'll call setLoginSuccess from App
  // }
  //
  // existingUser(event) {
  //   console.log(`Let's check if this user exists...`);
  //   console.log(event.target.value);
  //   event.preventDefault();
  // }

  render() {
    const { whichPortal } = this.state;
    return (
      <Grid>
        <Row>
          <Cell columns={12}>
            <span role="img" aria-label="Portal">Hello Portal Page! 🌀</span>
          </Cell>
        </Row>
        { whichPortal ? <Signup switchPortal={this.switchPortal} /> : <Signin switchPortal={this.switchPortal} /> }
      </Grid>
    );
  }
}

export default Portal;
