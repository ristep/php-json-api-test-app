import "./App.scss";

import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavLink  } from "react-bootstrap";

import Home from "pages/home";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Queries from "pages/queries";
import About from "pages/about";

const themes = [
  { title: "Spacelab", path: "/styles/Spacelab/main.css" },
  { title: "Sketchy Light", path: "/styles/sketchy-light/main.css" },
  { title: "Sketchy Dark", path: "/styles/sketchy-dark/main.css" },
  { title: "Cyborg", path: "/styles/cyborg/main.css" },
  { title: "Lumen", path: "/styles/lumen/lumen.css" },
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
      <link rel="stylesheet" type="text/css" href={process.env.PUBLIC_URL + themes[styleIndex].path}></link>
      <Router>

        <header className="App-header">
          <Navbar bg="primary" expand="lg" className="navbar-dark" >
            <Navbar.Brand>Json API test</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink href="#/home">Home</NavLink>
                <NavLink href="#/queries">Requests</NavLink>
                <NavLink href="#/about">About</NavLink>
                {/* <NavDropdown title="Queries" id="basic-nav-dropdown">
                <NavDropdown.Item href="#hr01" onClick={() => setRequest(getUser)}>User id:3 </NavDropdown.Item>
                <NavDropdown.Item href="#hr02" onClick={() => setRequest(getUser4all)}>User id:5 all Fields</NavDropdown.Item>
                <NavDropdown.Item href="#hr03" onClick={() => setRequest(getUsersPage)}>Users pagination</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#hr04" onClick={() => setRequest(getFoodsAllAll)}>Foods all, all attributes </NavDropdown.Item>
              </NavDropdown> */}
              </Nav>
              <Button type="button" onClick={handleButtonClick}>
                Click to change theme: {themes[styleIndex].title}
              </Button>
              {/* <Link onClick={() => window.location.replace("/about")}>About</Link> */}
            </Navbar.Collapse>
          </Navbar>

        </header>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/queries/:rqID" >
            <Queries />
          </Route>
          <Route path="/queries" >
            <Queries />
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
