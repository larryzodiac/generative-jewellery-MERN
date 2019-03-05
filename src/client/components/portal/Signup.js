/*
  Evan MacHale - N00150552
  03.03.19
  Signup.js
  + + + + + + + + + + +
  + World Map 🌀
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin
  +       ¬ Signup      <--- You are here 🚀
  +     ¬ World
  +       ¬ Scene
  +       ¬ Saves
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Material Design Components
import { Row, Cell } from '@material/react-layout-grid';
import Button from '@material/react-button';
// My Components
import Text from '../input/Text';

/*
  Signup renders a form + handles POST requests 🔒
*/

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const { username } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { confirm } = this.state;
    // Validate Password
    let passwordValid;
    if (password === confirm && password !== '' && confirm !== '') {
      passwordValid = true;
    } else {
      passwordValid = false;
    }
    console.log(passwordValid);
    event.preventDefault();
    if (passwordValid) {
      axios.post('api/users/create', {
        username: 'Axios sent a POST'
      })
        .then((response) => {
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { switchPortal } = this.props;
    const { username } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { confirm } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Cell columns={12}>
              <h2>Sign Up Form</h2>
            </Cell>
            <Cell columns={12}>
              <Text name="username" label="Username" value={username} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Text name="email" label="Email" value={email} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Text name="password" label="Password" value={password} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Text name="confirm" label="Confirm" value={confirm} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Button type="submit" value="Submit">Sign up</Button>
            </Cell>
          </Row>
        </form>
        <Row>
          <Cell columns={12}>
            <p>
            Already have an account?
              <button type="button" onClick={switchPortal}>Sign in</button>
            </p>
          </Cell>
        </Row>
      </React.Fragment>
    );
  }
}

Signup.propTypes = {
  switchPortal: PropTypes.func
};

// Specifies the default values for props:
Signup.defaultProps = {
  switchPortal: null
};

export default Signup;
