import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


import './navbar.css';
import Navbar from './navbar/navbar';
import Edit from './edit';
import Login from './Login';
import Register from './Register';
import VenuesDashboard from './VenuesDashboard';
import UserVenuesDashboard from './UserVenuesDashboard';
import About from './About';
import ActivityDashboard from './ActivityDashboard';
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./changePassword";
import EmailSent from "./emailsent";
import Home from "./Home";
import UserHome from "./UserHome";
import UserProfile from './pages/UserProfile';
import UserOwnerSwitch from "./UserOwnerSwitch";
import './Login.css';



const App = () => {
 return (
   <div>
     <Routes>
      <Route exact path='/' element={<UserOwnerSwitch/>} />
      <Route exact path='/Home' element={<Home/>} />
      <Route exact path='/UserHome' element={<UserHome/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
      <Route exact path='/forgotpassword' element={<ForgotPassword/>} />
      <Route exact path='/changepassword' element={<ChangePassword/>} />
      <Route exact path='/about' element={<About/>} />
      <Route exact path='/emailsent' element={<EmailSent/>} />
      <Route path='/VenuesDashboard' element={<VenuesDashboard/>} />
      <Route path='/UserVenuesDashboard' element={<UserVenuesDashboard/>} />
      <Route path='/ActivityDashboard' element={<ActivityDashboard/>} />
      <Route path='/UserOwnerSwitch' element={<UserOwnerSwitch/>} />
      <Route path='/UserProfile' element={<UserProfile/>} />
     </Routes>

   </div>
 );
};
 
export default App;