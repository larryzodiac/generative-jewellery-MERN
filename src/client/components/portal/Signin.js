/*
  Evan MacHale - N00150552
  03.03.19
  Signin.js
  + + + + + + + + + + +
  + World Map 🌀
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin      <--- You are here 🚀
  +       ¬ Signup
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
  Signin renders a form + handles POST requests 🔒
*/

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    const { setLoginSuccess } = this.props;
    /*
      react-router Route Component Props History 🔌
      Allows us to redirect by accessing the history prop!
      https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
    */
    const { history } = this.props;
    /*
      Make GET Request 📮
    */
    axios.post('api/users/signin', { email, password })
      .then((response) => {
        if (response.data.email === email && response.data.password === password) {
          setLoginSuccess(response.data._id);
          history.push('/');
        } else {
          console.log('incorrect data');
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { switchPortal } = this.props;
    const { email } = this.state;
    const { password } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Cell columns={12}>
              <h2>Sign In Form</h2>
            </Cell>
            <Cell columns={12}>
              <Text name="email" label="Email" value={email} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Text name="password" label="Password" value={password} onChange={this.handleInputChange} />
            </Cell>
            <Cell columns={12}>
              <Button type="submit" value="Submit">Sign in</Button>
            </Cell>
          </Row>
        </form>
        <Row>
          <Cell columns={12}>
            <p>
              New user?
              <button type="button" onClick={switchPortal}>Sign up</button>
            </p>
          </Cell>
        </Row>
      </React.Fragment>
    );
  }
}

Signin.propTypes = {
  switchPortal: PropTypes.func,
  setLoginSuccess: PropTypes.func,
  history: PropTypes.object
};

// Specifies the default values for props:
Signin.defaultProps = {
  switchPortal: null,
  setLoginSuccess: null,
  history: null
};

export default Signin;
