import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "./styles/App.scss";

const themes = [
  "./styles/sketchy-light/main.css",
  "./styles/sketchy-dark/main.css",
  "./styles/cyborg/main.css",
  "./styles/lumen/lumen.css",
];

function App() {
  const [ styleIndex, setStyleIndex ] = useState({ index: 0, path: themes[0] });
    
  useEffect(() => {
    let ndx = parseInt(localStorage.getItem("styleIndex"));
    if(ndx>0) 
      setStyleIndex({ index: ndx, path: themes[ndx]});  
  }, []);
  
  const handleButtonClick = () => {
    const next = styleIndex.index + 1;
    if( next===themes.length ) next = 0;
    setStyleIndex({ index: next , path: themes[next] });
    localStorage.setItem('styleIndex', next); 
  }

  return (
    <div className="App">
      <link rel="stylesheet" type="text/css" href={styleIndex.path}></link>

      <header className="App-header">
      <div>
      <Button type="button" onClick={handleButtonClick}>
       Click to update stylesheet[{styleIndex.index}]: {styleIndex.path}

      </Button>
      </div>
        <h1>Sketchy</h1>
      </header> 
      <div className="appBody">
        <div>
          <Button className="btn-primary">Primary</Button>
          <Button className="btn-secondary">Secondary</Button>
          <Button className="btn-success">Success</Button>
          <Button className="btn-info">Info</Button>
          <Button className="btn-warning">Warning</Button>
          <Button className="btn-danger">Danger</Button>
        </div>
        <div>
          <div className="jumbotron">
            <h1 className="display-3">Hello, world!</h1>
            <p className="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr className="my-4" />
            <p>
              It uses utility classes for typography and spacing to space
              content out within the larger container.
            </p>
            <p className="lead">
              <Button className="btn btn-primary btn-lg"  role="button">
                Learn more
              </Button>
            </p>
          </div>
        </div>
        <div className="card border-primary mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Primary card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-secondary mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Secondary card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-success mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Success card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-danger mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Danger card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-warning mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Warning card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-info mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Info card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-light mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Light card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card border-dark mb-3" style={{maxWidth: "20rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h4 className="card-title">Dark card title</h4>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>     
    </div>
  );
}

export default App;
