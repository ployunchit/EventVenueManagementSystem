import React from 'react';
import EditableLabel from 'react-inline-editing';
import {useNavigate} from 'react-router-dom';
import './UserProfile.css';
import '../navbar.css';
import Navbar from '../navbar/navbar';

function UserProfile() {
  return (
    <div><Navbar></Navbar>
  <div class = "row">
    <div class="column">
      <div class="card">
        <img src="avataricon.png" alt="Avatar"/> 
        <p>Name: <EditableLabel text='John Doe'/></p>
        <p>Email: <EditableLabel text='johndoe@iu.edu'/></p>
        <p>Zip code: <EditableLabel text='47401'/></p>
      </div>
    </div>
    <div class="column">
      <div class="events">
        <h1>My Past Reservations</h1>
          <div class="events-row">
            <div class="events-card">
              <div class="wrapper">
                <div class="date">
                  <span class="day">12</span>
                  <span class="month"> Aug</span>
                  <span class="year"> 2016</span>
                  <span class="time"> 8:00 PM</span>
                </div>
              <div class="data">
                <div class="content">
                  <h1 class="title">Tennis Match</h1>
                  <p class="text">Tennis Club</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  );
}

export default UserProfile;