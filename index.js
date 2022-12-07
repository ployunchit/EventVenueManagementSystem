// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Switch, Redirect, Route } from 'react-router';
// import { BrowserRouter, Link, Routes } from 'react-router-dom';

// import './navbar.css';
// import Navbar from './navbar/navbar';
// import Edit from './edit';
// import Login from './Login';
// import Register from './Register';
// import VenuesDashboard from './VenuesDashboard';
// import ActivityDashboard from './ActivityDashboard';
// import Home from "./Home";
// import UserProfile from './pages/UserProfile';
// import './Login.css';

// ReactDOM.render(
//     <BrowserRouter>
//         <Switch>
//             <Route exact path='/' component={Home} />
//             <Route exact path='/login' component={Login} />
//             <Route exact path='/register' component={Register} />
//             <Route path='/VenuesDashboard' component={VenuesDashboard} />
//             <Route path='/ActivityDashboard' component={ActivityDashboard} />
//             <Route path='/UserProfile' component={UserProfile} />
//             {/* <Route component={NotFound}/> */}
//         </Switch>
//     </BrowserRouter>,
//     document.getElementById('root')
// );


import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from "./store";

const persistedStore = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
      <App />
      </PersistGate>
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);