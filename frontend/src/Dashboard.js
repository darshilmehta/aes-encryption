import React, { Component } from 'react';
import { LinearProgress, Button } from '@material-ui/core';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: ''
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        console.log("Page loaded")
      });
    }
  }
  
  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
          <h2>Welcome!</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.logOut}
          >
            Logout
          </Button>
      </div>
    );
  }
}