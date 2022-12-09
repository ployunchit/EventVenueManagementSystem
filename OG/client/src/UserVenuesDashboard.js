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

export default class UserVenuesDashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openVenueModal: false,
      openVenueEditModal: false,
      id: '',
      name: '',
      address: '',
      slots: '',
      price: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      venues: [],
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
        this.getVenue();
      });
    }
  }

  getVenue = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`https://eventhub-server.onrender.com/get-venue${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, venues: res.data.venues, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, venues: [], pages: 0 },()=>{});
    });
  }


  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getVenue();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    // this.props.history.push('/');
    window.location.href = '/';
  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getVenue();
      });
    }
  };





  updateVenue = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('address', this.state.address);
    file.append('slots', this.state.slots);
    file.append('price', this.state.price);

    axios.post('https://eventhub-server.onrender.com/update-venue', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleVenueEditClose();
      this.setState({ name: '', address: '', slots: '', price: '', file: null }, () => {
        this.getVenue();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleVenueEditClose();
    });

  }

  handleVenueOpen = () => {
    this.setState({
      openVenueModal: true,
      id: '',
      name: '',
      address: '',
      slots: '',
      price: '',
      fileName: ''
    });
  };

  handleVenueClose = () => {
    this.setState({ openVenueModal: false });
  };

  handleVenueEditOpen = (data) => {
    this.setState({
      openVenueEditModal: true,
      id: data._id,
      name: data.name,
      address: data.address,
      slots: data.slots,
      price: data.price,
      fileName: data.image
    });
  };

  bookEvent = (row) => {

  };

  handleVenueEditClose = () => {
    this.setState({ openVenueEditModal: false });
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <br/><br/>
          <h2>Venues Dashboard</h2>
          <br/>
        </div>

        <br />

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
                <TableCell align="center">Slots</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">Book</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.venues.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={`https://eventhub-server.onrender.com/${row.image}`} width="100" height="100" /></TableCell>
                  <TableCell align="center">{row.address}</TableCell>
                  <TableCell align="center">{row.slots}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.bookEvent(row)}
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