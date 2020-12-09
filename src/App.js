import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Juegos from "./components/Juegos"
import CrearJuego from "./components/CrearJuego"

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container">
          <Link to="/">Juegos</Link>
          <Link to="/about">Crear juego</Link>          
          <Link to="/dashboard">Dashboard</Link>
          </div>
        </nav>


        <Switch>
          <Route exact path="/">
            <Juegos />
          </Route>
          <Route path="/crear-juego">
            <CrearJuego />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
