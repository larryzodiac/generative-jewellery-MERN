import React, { Component } from 'react';
import axios from 'axios';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  componentDidMount() {
    axios.get('/api/users/')
      .then(res => this.setState({ username: res.data[0].name }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
