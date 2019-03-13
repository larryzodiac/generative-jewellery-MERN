/*
  Evan MacHale - N00150552
  11.03.19
  Saves.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Login
  +       ¬ Signup
  +     ¬ World
  +       ¬ Playground
  +       ¬ Saves       <--- You are here 🚀
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Material Design Components
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { Headline4 } from '@material/react-typography';
// My Components
import WeightCard from '../input/WeightCard';

/*
  Saves displays data for the logged in user
*/

class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weights: []
    };
    this.fetchWeights = this.fetchWeights.bind(this);
    this.deleteWeights = this.deleteWeights.bind(this);
  }

  componentDidMount() {
    this.fetchWeights();
  }

  fetchWeights() {
    const { id } = this.props;
    axios.get(`api/users/${id}`)
      .then((response) => {
        // console.log(response.data.weights);
        this.setState({ weights: response.data.weights });
      })
      .catch(error => console.log(error));
  }

  deleteWeights(id) {
    const { handleDelete } = this.props;
    axios.put(`api/users/delete/${id}`)
      .then((response) => {
        if (response.status === 200) {
          this.fetchWeights();
          handleDelete();
        }
      });
  }

  render() {
    const { weights } = this.state;
    const { id } = this.props;
    const { loadWeights } = this.props;
    const weightsList = weights.map(w => (
      <WeightCard
        key={w.name}
        id={id}
        loadWeights={loadWeights}
        deleteWeights={this.deleteWeights}
        name={w.name}
        data={{
          weightId: w.weight_id,
          geometry: w.geometry,
          subdivisions: w.subdivisions,
          adjacentWeight: w.adjacentWeight,
          edgePointWeight: w.edgePointWeight,
          connectingEdgesWeight: w.connectingEdgesWeight
        }}
      />
    ));
    return (
      <Grid align="right">
        <Row>
          <Cell columns={4} />
          <Cell>
            <Headline4>Saved Geometries</Headline4>
          </Cell>
          <Cell columns={4} />
        </Row>
        {weightsList}
      </Grid>
    );
  }
}

Saves.propTypes = {
  id: PropTypes.string.isRequired,
  loadWeights: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default Saves;
