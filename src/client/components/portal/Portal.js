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
import PropTypes from 'prop-types';
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
  }

  // Toggle between forms
  switchPortal() {
    this.setState(prevState => ({
      whichPortal: !prevState.whichPortal
    }));
  }

  render() {
    const { whichPortal } = this.state;
    const { setLoginSuccess } = this.props;
    return (
      <Grid>
        <Row>
          <Cell columns={12}>
            <span role="img" aria-label="Portal">Hello Portal Page! 🌀</span>
          </Cell>
        </Row>
        <Row>
          <Cell columns={12}>
            <p>Note these forms do not have visual validation.</p>
            <p>Name and email may be any string, passwords must match.</p>
          </Cell>
        </Row>
        { whichPortal ? <Signup {...this.props} switchPortal={this.switchPortal} setLoginSuccess={setLoginSuccess} /> : <Signin {...this.props} switchPortal={this.switchPortal} setLoginSuccess={setLoginSuccess} /> }
      </Grid>
    );
  }
}

Portal.propTypes = {
  setLoginSuccess: PropTypes.func
};

// Specifies the default values for props:
Portal.defaultProps = {
  setLoginSuccess: null
};

export default Portal;
