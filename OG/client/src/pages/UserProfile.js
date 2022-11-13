import React from 'react';
import {useNavigate} from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  
  const navigate = useNavigate();

  const navigateToContacts = () => {
    navigate('/edit');
  };
  return (
  <div class = "row">
    <div class="column">
      <div class="card">
        <img src="avataricon.png" alt="Avatar"/> 
        <h1>John Doe</h1>
        <p class="title">Email: </p>
        <p>Zip code: </p>
        {/* <p><button onClick={navigateToContacts}>Edit</button></p> */}
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
    <div class="column">
      <div class="calendar">
        <h1>Calendar</h1>
      </div>
    </div>
  </div>
  
  );
}

export default UserProfile;