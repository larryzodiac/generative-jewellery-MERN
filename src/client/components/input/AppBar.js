/*
  Evan MacHale - N00150552
  10.03.19
  AppBar.js
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material Design Components
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
// My Components
import Tab from './Tab';

/*
  AppBar functions as modular component for World + Account 📦
*/

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tabIndex } = this.props;
    const { toggleTab } = this.props;
    const { icon } = this.props;
    const { toggleDrawer } = this.props;
    const { logout } = this.props
    let menu;
    if (icon && toggleDrawer) {
      menu = <MaterialIcon icon="menu" onClick={toggleDrawer} />;
    } else {
      // menu = <React.Fragment />;
      menu = <MaterialIcon icon="" />;
    }

    return (
      <React.Fragment>
        <TopAppBar
          fixed
          className="top-app-bar-alternate"
          navigationIcon={menu}
          actionItems={[
            <Tab
              tabIndex={tabIndex}
              toggleTab={toggleTab}
            />,
            <MaterialIcon icon="exit_to_app" onClick={logout} />
          ]}
        />
      </React.Fragment>
    );
  }
}

// <Button outlined className="button-logout">LOGOUT</Button>,

AppBar.propTypes = {
  icon: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  toggleTab: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default AppBar;
