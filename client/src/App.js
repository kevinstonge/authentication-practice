import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Nav from "./components/Nav";
import './styles/App.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Router>
      <header>
        <h1>authentication practice</h1>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      </header>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login setLoggedIn={setLoggedIn}/>
      </Route>
    </Router>
  );
}

export default App;
