import React, { Component } from 'react';
const axios = require('axios');

export default class Chat extends Component {


  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'https://eventhubse-chat.onrender.com/';
    } else {
      this.setState({ token: token }, () => {
        this.getActivity();
      });
    }
  }
}