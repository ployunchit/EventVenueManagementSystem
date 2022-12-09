import React, { Component } from 'react';
import swal from 'sweetalert';
import { Button, TextField, Link, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import './navbar.css';
import Navbar from './navbar/LoginNavbar';
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirm_password: '',
      UserOwner: '',
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  register = () => {

    axios.post('https://eventhub-server.onrender.com/register', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      UserOwner: this.state.UserOwner,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      // this.props.history.push('/');
      if(this.state.UserOwner == "owner")
      {
        window.location.href = '/Home';
      }
      else
      {
        window.location.href = '/UserHome';
      }
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
        <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            placeholder="First Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
            placeholder="Last Name"
            required
          />
          <br /><br />
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
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
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
            disabled={this.state.firstName == '' && this.state.lastName == '' && this.state.username == '' && this.state.password == ''}
            onClick={this.register}
          >
            Register
          </Button> 
          <br></br>
          <Link href="/login">
            <p>Already Have an Account?</p>
            Login
          </Link>
        </div>
      </div>
      </div>
    );
  }
}
