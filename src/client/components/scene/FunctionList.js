// ------------------------------------------------- //
// Evan MacHale - N00150552
// 15.01.19
// Geometries radio list
// ------------------------------------------------- //

import React, { Component } from 'react';

// ------------------------------------------------- //

// My components
import Slider from '../input/Slider_';

// ------------------------------------------------- //

class FunctionList extends Component {
  render () {
    // function options for slider
    const functions = [
      {label:'Subdivisions', name:'subdivisions', value:this.props.subdivisions, min:0, max:5, step:1},
      {label:'Adjacent Weight', name:'adjacentWeight', value:this.props.adjacent_weight, min:0, max:1, step:null},
      {label:'Edge-Point Weight', name:'edgePointWeight', value:this.props.edge_point_weight, min:0, max:1, step:null},
      {label:'Connecting Edges Weight', name:'connectingEdgesWeight', value:this.props.connecting_edges_weight, min:1, max:7, step:1}
    ];
    // Passing Props to generate list
    const functions_list = functions.map(f => {
      return (
        <Slider
          key={f.name}
          label={f.label}
          name={f.name}
          value={f.value}
          onChange={this.props.onChange}
          min={f.min}
          max={f.max}
          step={f.step}
        />
      )
    });

    return (
      <React.Fragment>
        {functions_list}
      </React.Fragment>
    );
  }
}

// ------------------------------------------------- //

export default FunctionList;

// ------------------------------------------------- //
