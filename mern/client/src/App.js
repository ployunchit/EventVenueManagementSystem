import React from "react";
import "./components/navbar.css"
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar/navbar";
import Home from "./components/pages/Home";
// import RecordList from "./components/recordList";
import Edit from "./components/edit";
import SignUp from "./components/login/signup";
import SignIn from "./components/login/signin";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/signin" element={<SignIn />} />
     </Routes>

   </div>
 );
};
 
export default App;