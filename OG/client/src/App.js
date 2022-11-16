import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";


import './navbar.css';
import Navbar from './navbar/navbar';
import Edit from './edit';
import Login from './Login';
import Register from './Register';
import VenuesDashboard from './VenuesDashboard';
import ActivityDashboard from './ActivityDashboard';
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./changePassword";
import emailsent from "./emailsent";
import Home from "./Home";
import UserProfile from './pages/UserProfile';
import './Login.css';



const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/register' element={<Register/>} />
      <Route exact path='/forgotpassword' element={<ForgotPassword/>} />
      <Route exact path='/changepassword' element={<ChangePassword/>} />
      <Route exact path='/emailsent' element={<emailsent/>} />
      <Route path='/VenuesDashboard' element={<VenuesDashboard/>} />
      <Route path='/ActivityDashboard' element={<ActivityDashboard/>} />
      <Route path='/UserProfile' element={<UserProfile/>} />
     </Routes>

   </div>
 );
};
 
export default App;