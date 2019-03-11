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
  +       ¬ Playground
  +       ¬ Saves
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
// My Components
import AppBar from './AppBar';
import Playground from './Playground';
import Saves from './Saves';

/*
  World functions as an environment for creating jewellery 💎
*/

class World extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      tabIndex: 0,
      navigationIcon: true
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleDrawer() {
    this.setState(prevState => ({ drawerOpen: !prevState.drawerOpen }));
  }

  toggleTab(tabIndex) {
    this.setState(prevState => ({
      tabIndex,
      navigationIcon: !prevState.navigationIcon
    }));
  }

  // toggleTab(tabIndex) { this.setState({ tabIndex }); }

  render() {
    const { drawerOpen } = this.state;
    const { tabIndex } = this.state;
    const { navigationIcon } = this.state;
    const { id } = this.props;
    const { setLoginSuccess } = this.props;
    const { logout } = this.props;
    return (
      <div className="drawer-container">

        <AppBar
          icon={navigationIcon}
          toggleDrawer={this.toggleDrawer}
          tabIndex={tabIndex}
          toggleTab={this.toggleTab}
          logout={logout}
        />

        <TopAppBarFixedAdjust className="top-app-bar-fix-adjust">
          { !tabIndex ? <Playground drawerOpen={drawerOpen} /> : <Saves /> }
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

World.propTypes = {
  id: PropTypes.string,
  setLoginSuccess: PropTypes.func.isRequired
};

// Specifies the default values for props:
World.defaultProps = {
  id: ''
};

export default World;
