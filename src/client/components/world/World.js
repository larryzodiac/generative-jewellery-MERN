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
import axios from 'axios';
// Material Design Components
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
// My Components
import AppBar from '../input/AppBar';
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
      navigationIcon: true,
      // For the Scene
      weightId: '',
      geometry: 'Cube',
      wireframe: false,
      subdivisions: 0,
      adjacentWeight: 0.125,
      edgePointWeight: 0.375,
      connectingEdgesWeight: 5
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadWeights = this.loadWeights.bind(this);
    this.saveWeights = this.saveWeights.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.clear = this.clear.bind(this);
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

  handleChange(event, sliderValue) {
    const { id } = event.target;
    const name = event.target.type === 'checkbox' ? 'wireframe' : event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    });
    // Truthy/falsy
    if (sliderValue || sliderValue === 0) {
      this.setState({
        [id]: sliderValue
      });
    }
  }

  loadWeights(data) {
    this.setState({
      drawerOpen: true,
      tabIndex: 0,
      navigationIcon: true,
      // For the Scene
      weightId: data.weightId,
      geometry: data.geometry,
      wireframe: false,
      subdivisions: data.subdivisions,
      adjacentWeight: data.adjacentWeight,
      edgePointWeight: data.edgePointWeight,
      connectingEdgesWeight: data.connectingEdgesWeight
    });
  }

  saveWeights() {
    const { id } = this.props;
    const { weightId } = this.state;
    const { geometry } = this.state;
    const { subdivisions } = this.state;
    const { adjacentWeight } = this.state;
    const { edgePointWeight } = this.state;
    const { connectingEdgesWeight } = this.state;
    axios.put('api/users/save', {
      id,
      weightId,
      geometry,
      subdivisions,
      adjacentWeight,
      edgePointWeight,
      connectingEdgesWeight
    });
  }

  handleDelete() {
    console.log('wowo');
    this.setState({ weightId: '' });
  }

  clear() {
    this.setState({
      weightId: '',
      geometry: 'Cube',
      wireframe: false,
      subdivisions: 0,
      adjacentWeight: 0.125,
      edgePointWeight: 0.375,
      connectingEdgesWeight: 5
    });
  }

  render() {
    // Navigation
    const { drawerOpen } = this.state;
    const { tabIndex } = this.state;
    const { navigationIcon } = this.state;
    // For Scene
    const { geometry } = this.state;
    const { wireframe } = this.state;
    const { subdivisions } = this.state;
    const { adjacentWeight } = this.state;
    const { edgePointWeight } = this.state;
    const { connectingEdgesWeight } = this.state;
    // Props
    const { id } = this.props;
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
          {!tabIndex ? (
            <Playground
              drawerOpen={drawerOpen}
              handleChange={this.handleChange}
              saveWeights={this.saveWeights}
              clear={this.clear}
              geometry={geometry}
              wireframe={wireframe}
              subdivisions={subdivisions}
              adjacentWeight={adjacentWeight}
              edgePointWeight={edgePointWeight}
              connectingEdgesWeight={connectingEdgesWeight}
            />
          ) : (
            <Saves
              id={id}
              loadWeights={this.loadWeights}
              handleDelete={this.handleDelete}
            />
          )}
        </TopAppBarFixedAdjust>
      </div>
    );
  }
}

World.propTypes = {
  id: PropTypes.string,
  logout: PropTypes.func.isRequired
};

// Specifies the default values for props:
World.defaultProps = {
  id: ''
};

export default World;
