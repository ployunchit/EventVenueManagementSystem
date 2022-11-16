import React, { Component } from 'react';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');

export default class emailsent extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>About</h2>
          <br></br>
          <h3>This is a template page. Information will be updated shortly.</h3>
          <br></br>
        </div>
          <Link href="/">
            Go Back to Home
          </Link>
        </div>
    );
  }
}
