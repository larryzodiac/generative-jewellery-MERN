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
  DrawerContent
} from '@material/react-drawer';
import List, {
  ListGroup,
  ListDivider,
  ListItem
} from '@material/react-list';
import Button from '@material/react-button';
// My Components
import Scene from '../scene/Scene';
import GeometryList from '../scene/GeometryList';
import FunctionList from '../scene/FunctionList';

/*
  Playground functions as container for Three.js Scene Component
*/

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { exportClicked: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(prevState => ({
      exportClicked: prevState.exportClicked + 1
    }));
  }

  render() {
    const { exportClicked } = this.state;
    const { drawerOpen } = this.props;
    const { handleChange } = this.props;
    const { saveWeights } = this.props;
    const { clear } = this.props;
    const { geometry } = this.props;
    const { wireframe } = this.props;
    const { subdivisions } = this.props;
    const { adjacentWeight } = this.props;
    const { edgePointWeight } = this.props;
    const { connectingEdgesWeight } = this.props;
    return (
      <React.Fragment>
        <Drawer
          className="drawer-alternate"
          dismissible
          open={drawerOpen}
        >
          <DrawerContent>
            <ListGroup>
              <List nonInteractive>
                <GeometryList
                  geometry={geometry}
                  wireframe={wireframe}
                  onChange={handleChange}
                />
              </List>
              <ListDivider className="drawer-divider" />
              <List nonInteractive>
                <FunctionList
                  subdivisions={subdivisions}
                  adjacent_weight={adjacentWeight}
                  edge_point_weight={edgePointWeight}
                  connecting_edges_weight={connectingEdgesWeight}
                  onChange={handleChange}
                />
              </List>
              <ListDivider className="drawer-divider" />
              <List nonInteractive>
                <ListItem className="drawer-list-item">
                  <Button
                    className="button-alternate-clear"
                    outlined
                    onClick={this.handleClick}
                  >
                    Download .stl
                  </Button>
                </ListItem>
                <ListItem className="drawer-list-item">
                  <Button
                    className="button-alternate"
                    outlined
                    onClick={saveWeights}
                  >
                    Save
                  </Button>
                </ListItem>
                <ListItem className="drawer-list-item">
                  <Button
                    className="button-alternate"
                    outlined
                    onClick={clear}
                  >
                    New
                  </Button>
                </ListItem>
              </List>
            </ListGroup>
          </DrawerContent>
        </Drawer>
        <DrawerAppContent className="drawer-app-content">
          <Scene
            geometry={geometry}
            wireframe={wireframe}
            subdivisions={subdivisions}
            adjacentWeight={adjacentWeight}
            edgePointWeight={edgePointWeight}
            connectingEdgesWeight={connectingEdgesWeight}
            exportClicked={exportClicked}
          />
        </DrawerAppContent>
      </React.Fragment>
    );
  }
}

Playground.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  saveWeights: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  geometry: PropTypes.string.isRequired,
  wireframe: PropTypes.bool.isRequired,
  subdivisions: PropTypes.number.isRequired,
  adjacentWeight: PropTypes.number.isRequired,
  edgePointWeight: PropTypes.number.isRequired,
  connectingEdgesWeight: PropTypes.number.isRequired,
};

export default Playground;
