import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
import './navbar.css';
import Navbar from './navbar/UserNavbar';
const axios = require('axios');

export default class UserActiviyDashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openActivityModal: false,
      openActivityEditModal: false,
      id: '',
      name: '',
      address: '',
      price: '',
      capacity: '',
      dateTime: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      activities: [],
      pages: 0,
      loading: false
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      // this.props.history.push('/login');
      window.location.href = '/login';
    } else {
      this.setState({ token: token }, () => {
        this.getActivity();
      });
    }
  }

  getActivity = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`https://eventhub-server.onrender.com/get-activity${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, activities: res.data.activities, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, activities: [], pages: 0 },()=>{});
    });
  }


  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getActivity();
    });
  }


  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getActivity();
      });
    }
  };


  handleActivityOpen = () => {
    this.setState({
      openActivityModal: true,
      id: '',
      name: '',
      address: '',
      price: '',
      capacity: '',
      dateTime: '',
      fileName: ''
    });
  };

  updateActivity = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('address', this.state.address);
    file.append('price', this.state.price);
    file.append('capacity', this.state.capacity - 1);
    file.append('dateTime',this.state.dateTime);

    axios.post('https://eventhub-server.onrender.com/update-activity', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: "Thank you for registering for this event! Enjoy!",
        icon: "success",
        type: "success"
      });

      this.handleActivityEditClose();
      this.setState({ name: '', address: '', price: '', capacity: '', dateTime: '', file: null }, () => {
        this.getActivity();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleActivityEditClose();
    });

  }

  handleActivityClose = () => {
    this.setState({ openActivityModal: false });
  };

  handleActivityEditOpen = (data) => {
    this.setState({
      openActivityEditModal: true,
      id: data._id,
      name: data.name,
      address: data.address,
      price: data.price,
      capacity: data.capacity,
      dateTime: data.dateTime,
      fileName: data.image
    });
  };

  handleActivityEditClose = () => {
    this.setState({ openActivityEditModal: false });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <br/><br/>
          <h2>Activities Dashboard</h2>
          <br/>
        </div>
        <br />

        <Button
        className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.getActivity()}
                    >
                      Load Events
        </Button>
        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Date and Time</TableCell>
                <TableCell align="center">Book</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.activities.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={`https://eventhub-server.onrender.com/${row.image}`} width="100" height="100" /></TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.capacity}</TableCell>
                  <TableCell align="center">{row.dateTime}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.updateActivity()}
                    >
                      Book
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>
      </div>
    );
  }
}