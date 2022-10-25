import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
const axios = require('axios');

export default class ActiviyDashboard extends Component {
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
      this.props.history.push('/login');
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
    axios.get(`http://localhost:2000/get-activity${data}`, {
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

  deleteActivity = (id) => {
    axios.post('http://localhost:2000/delete-activity', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getActivity();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
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

  addActivity = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('address', this.state.address);
    file.append('price', this.state.price);
    file.append('capacity',this.state.capacity);
    file.append('dateTime',this.state.dateTime);

    axios.post('http://localhost:2000/add-activity', file, {
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

      this.handleActivityClose();
      this.setState({ name: '', address: '', price: '', capacity: '', dateTime: '', file: null, page: 1 }, () => {
        this.getActivity();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleActivityClose();
    });

  }

  updateActivity = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('address', this.state.address);
    file.append('price', this.state.price);
    file.append('capacity', this.state.capacity);
    file.append('dateTime',this.state.dateTime);

    axios.post('http://localhost:2000/update-activity', file, {
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
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <br/><br/>
          <h2>Activities Dashboard</h2>
          <br/>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handleActivityOpen}
          >
            Add Activity
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>

        {/* Edit Activity */}
        <Dialog
          open={this.state.openActivityEditModal}
          onClose={this.handleActivityClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Activity</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price"
              required
            /><br />
             <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="capacity"
              value={this.state.capacity}
              onChange={this.onChange}
              placeholder="Capacity"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="dateTime"
              value={this.state.dateTime}
              onChange={this.onChange}
              placeholder="Date and Time"
              required
            /><br />
            <br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleActivityEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.address == '' || this.state.price == '' || this.state.capacity == '' || this.state.dateTime == ''}
              onClick={(e) => this.updateActivity()} color="primary" autoFocus>
              Edit Activity
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Activity */}
        <Dialog
          open={this.state.openActivityModal}
          onClose={this.handleActivityClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add Activity</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="address"
              value={this.state.address}
              onChange={this.onChange}
              placeholder="Address"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="price"
              value={this.state.price}
              onChange={this.onChange}
              placeholder="Price"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="number"
              autoComplete="off"
              name="capacity"
              value={this.state.capacity}
              onChange={this.onChange}
              placeholder="Capacity"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="dateTime"
              value={this.state.dateTime}
              onChange={this.onChange}
              placeholder="Date and Time"
              required
            /><br />
            <br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleActivityClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.address == '' || this.state.price == '' || this.state.capacity == '' || this.state.dateTime == '' || this.state.file == null}
              onClick={(e) => this.addActivity()} color="primary" autoFocus>
              Add Activity
            </Button>
          </DialogActions>
        </Dialog>

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
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Date and Time</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.activities.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={`http://localhost:2000/${row.image}`} width="70" height="70" /></TableCell>
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
                      onClick={(e) => this.handleActivityEditOpen(row)}
                    >
                      Edit
                  </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deleteActivity(row._id)}
                    >
                      Delete
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