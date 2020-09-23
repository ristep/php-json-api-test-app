import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import "styles/Spacelab/main.css";

ReactDOM.render(
  <React.StrictMode>
    {/* <link rel="stylesheet" type="text/css" href={process.env.PUBLIC_URL + "/styles/Spacelab/main.css"}></link> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
