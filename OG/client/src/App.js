import React from "react";
import { Route } from "react-router";
import { Switch, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VenuesDashboard from "./pages/VenuesDashboard";
import ActivityDashboard from "./pages/ActivityDashboard";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/VenuesDashboard" component={VenuesDashboard} />
          <Route path="/ActivityDashboard" component={ActivityDashboard} />
          {/* <Route component={NotFound}/> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
