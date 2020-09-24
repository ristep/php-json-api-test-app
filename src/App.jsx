import "App.scss";

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavLink } from "react-bootstrap";

import Home from "pages/home";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Queries from "pages/queries";
import About from "pages/about";
import Food from "pages/food";
import Foods from "pages/foods";

const themes = [
  { title: "Spacelab", path: "/styles/Spacelab/main.css" },
  { title: "Flatly", path: "/styles/Flatly/main.css" },
  { title: "United", path: "/styles/United/main.css" },
  { title: "Sketchy Light", path: "/styles/sketchy-light/main.css" },
  { title: "Sketchy Dark", path: "/styles/sketchy-dark/main.css" },
  { title: "Cyborg", path: "/styles/cyborg/main.css" },
  { title: "Lumen", path: "/styles/lumen/main.css" },
  { title: "Cerulean", path: "/styles/Cerulean/main.css" },
  { title: "Minty", path: "/styles/Minty/main.css" },
  { title: "Darkly", path: "/styles/Darkly/main.css" },
];

function App() {
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    let ndx = parseInt(localStorage.getItem("styleIndex"));
    if (ndx > 0) setStyleIndex(ndx);
  }, []);

  const handleButtonClick = () => {
    let next = styleIndex + 1;
    if (next === themes.length) next = 0;
    setStyleIndex(next);
    localStorage.setItem("styleIndex", next);
  };

  return (
    <div className="App">
      <link rel="stylesheet" type="text/css" href={process.env.PUBLIC_URL + themes[styleIndex].path} />
      {/* <link rel="stylesheet" type="text/css" href={process.env.PUBLIC_URL+"styles/App.scss"}></link> */}
      <Router basename="#/">

        <header className="App-header">
          <Navbar className="navbar-dark bg-primary" expand="lg">
            <Navbar.Brand>Json API test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink href="#/home">Home</NavLink>
                <NavLink href="#/foods">Foods</NavLink>
                <NavLink href="#/queries">Requests</NavLink>
                <NavLink href="#/about">About</NavLink>
              </Nav>
              <Button type="button" onClick={handleButtonClick}>
                Click to change theme: {themes[styleIndex].title}
              </Button>
              {/* <Link onClick={() => window.location.replace("/about")}>About</Link> */}
            </Navbar.Collapse>
          </Navbar>

        </header>
        <Switch>
          <Route path="/food/:foodID">
            <Food />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/queries/:rqID">
            <Queries />
          </Route>
          <Route path="/queries">
            <Queries />
          </Route>
          <Route path="/foods/:size/:page/:search">
            <Foods />
          </Route>
          <Route path="/foods/:size/:page">
            <Foods />
          </Route>
          <Route path="/foods">
            <Foods />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
