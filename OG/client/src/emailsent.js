import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Email Successfully Sent</h2>
          <br></br>
          <h3>If an account has been registered under email, an email will be sent with instructions on resetting the password.</h3>
          <br></br>
        </div>
          <Link href="/login">
            Go Back to Login
          </Link>
        </div>
    );
  }
}
