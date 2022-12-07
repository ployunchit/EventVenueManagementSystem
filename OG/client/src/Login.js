import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import './navbar.css';
import Navbar from './navbar/LoginNavbar';
const axios = require('axios');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      UserOwner: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {

    const pwd = bcrypt.hashSync(this.state.password, salt);

    axios.post('https://eventhub-server.onrender.com/login', {
      username: this.state.username,
      password: pwd,
      UserOwner: this.state.UserOwner,
    }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_id', res.data.id);
      // this.props.history.push('http://localhost:2000/VenuesDashboard');
      if(this.state.UserOwner == "owner")
      {
        window.location.href = '/Home';
      }
      else
      {
        window.location.href = '/UserHome';
      }
      
    }).catch((err) => {
      if (err.response && err.response.data && err.response.data.errorMessage) {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Login</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="UserOwner"
            value={this.state.UserOwner}
            onChange={this.onChange}
            >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="owner" control={<Radio />} label="Owner" />
            </RadioGroup>
          </FormControl>
          <br /><br />
          <Button
            className="button_style"
            style = {{height: '30px', width : '100px'}}
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username == '' && this.state.password == ''}
            onClick={this.login}
          >
            Login
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/register">
            Register
          </Link>
          <br /><br />
          <Link href="/forgotpassword">
            Forgot Password?
          </Link>
        </div>
      </div>
      </div>
    );
  }
}
