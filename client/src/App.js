import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import './styles/App.scss';

function App() {
  return (
    <Router>
      <header>
        <h1>authentication practice</h1>
        <nav>
          <NavLink to="/register">register</NavLink>
          <NavLink to="/login">login</NavLink>
        </nav>
      </header>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Router>
  );
}

export default App;
