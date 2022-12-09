import React, { Component } from 'react';
import { Button, TextField, Link } from '@material-ui/core';
import './HeroSection.css';


export default class UserOwnerSwitch extends React.Component 
{
  render() {
    return (
      <div className='hero-container'>
      <h1>Welcome to EventHub</h1>
      <Link href="/login">
        <Button
            className="button_style"
            style = {{height: '60px', width : '200px'}}
            variant="contained"
            color="primary"
            size="small"
          >
            Login
          </Button>
          </Link>
          <br></br>
          <Link href="/register">
          <Button
            className="button_style"
            style = {{height: '60px', width : '200px'}}
            variant="contained"
            color="primary"
            size="small"
          >
            Register
          </Button>
          </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    );
  }
}