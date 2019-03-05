/*
  Evan MacHale - N00150552
  03.03.19
  App.js
*/

import React, { Component } from 'react';
// Material Design Components
import TopAppBar, { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import Drawer, {
  DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle
} from '@material/react-drawer';
import List, { ListGroup, ListDivider } from '@material/react-list';
import Button from '@material/react-button';
import { ListItem } from '@material/react-list';
import MaterialIcon from '@material/react-material-icon';
// My Components
import Scene from './components/Scene';
import GeometryList from './components/GeometryList';
import FunctionList from './components/FunctionList';
import './App.scss';

/*
  App functions as a hub for all component traffic 🚂
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: true,
      exportClicked: false,
      // State properties to be passed to the Scene
      geometry: 'Cube',
      wireframe: false,
      subdivisions: 0,
      adjacent_weight: 0.125,
      edge_point_weight: 0.375,
      connecting_edges_weight: 5
    };
    // Binding is necessary to make `this` work in the methods
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen
    }));
  }

  handleChange = (event, slider_value) => {
    /*
      event.target when slider is changed is an <li> element
      It does not have event.target.value/name
      However the value of the slider may be passed directly as sliderValue
      This does not appply to the other targets as they are <input>
      See https://material-ui.com/lab/slider/
    */
    const { id } = event.target;
    const name = event.target.type === 'checkbox' ? 'wireframe' : event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
    // Truthy/falsy
    if (slider_value || slider_value === 0) {
      this.setState({
        [id]: slider_value
      });
    }
  }

  // Download + Save button
  handleClick = () => {
    this.setState(prevState => ({
      exportClicked: prevState.exportClicked + 1
    }));
  }

  render() {
    return (
      <div className="drawer-container">
        <Drawer
          className="drawer-alternate"
          dismissible
          open={this.state.drawerOpen}
        >
          <DrawerHeader className="drawer-title">
            <DrawerTitle tag="h2">Menu</DrawerTitle>
          </DrawerHeader>

          <DrawerContent>
            <ListGroup>
              <List nonInteractive>
                <GeometryList
                  geometry={this.state.geometry}
                  wireframe={this.state.wireframe}
                  onChange={this.handleChange}
                />
              </List>
              <ListDivider className="drawer-divider" />
              <List nonInteractive>
                <FunctionList
                  subdivisions={this.state.subdivisions}
                  adjacent_weight={this.state.adjacent_weight}
                  edge_point_weight={this.state.edge_point_weight}
                  connecting_edges_weight={this.state.connecting_edges_weight}
                  onChange={this.handleChange}
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
              </List>
            </ListGroup>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className="drawer-app-content">
          <TopAppBar
            title="Generative Jewellery"
            className="top-app-bar-alternate"
            navigationIcon={(
              <MaterialIcon
                icon="menu"
                onClick={this.toggleDrawer}
              />
)}
          />

          <TopAppBarFixedAdjust>
            <Scene
              geometry={this.state.geometry}
              subdivisions={this.state.subdivisions}
              adjacent_weight={this.state.adjacent_weight}
              edge_point_weight={this.state.edge_point_weight}
              connecting_edges_weight={this.state.connecting_edges_weight}
              wireframe={this.state.wireframe}
              exportClicked={this.state.exportClicked}
            />
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

// ------------------------------------------------- //

export default App;

// ------------------------------------------------- //
