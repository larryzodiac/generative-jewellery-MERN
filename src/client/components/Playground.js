/*
  Evan MacHale - N00150552
  11.03.19
  Playground.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World
  +       ¬ Playground  <--- You are here 🚀
  +       ¬ Saves
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import Drawer, {
  DrawerAppContent,
  DrawerContent,
} from '@material/react-drawer';
// My Components

/*
  Playground functions as container for Three.js Scene Component
*/

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { drawerOpen } = this.props;
    return (
      <React.Fragment>
        <Drawer
          className="drawer-alternate"
          dismissible
          open={drawerOpen}
        >
          <DrawerContent>Hello</DrawerContent>
        </Drawer>
        <DrawerAppContent className="drawer-app-content">Hello Scene</DrawerAppContent>
      </React.Fragment>
    );
  }
}

Playground.propTypes = {
  drawerOpen: PropTypes.bool.isRequired
};

export default Playground;
