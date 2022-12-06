import React, { Component } from 'react';
import { Button, TextField, Link } from '@material-ui/core';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class UserOwnerSwitch extends React.Component 
{
  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Login</h2>
        </div>

        <div>
        <Link href="/Userlogin">
        <Button
            className="button_style"
            style = {{height: '30px', width : '100px'}}
            variant="contained"
            color="primary"
            size="small"
          >
            User
          </Button>
          </Link>
          <Link href="/login">
          <Button
            className="button_style"
            style = {{height: '30px', width : '100px'}}
            variant="contained"
            color="primary"
            size="small"
          >
            Owner
          </Button>
          </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br /><br />
        </div>
      </div>
    );
  }
}
