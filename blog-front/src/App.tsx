import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Router
import Menu from './layout/Menu';
import Routes from './layout/Routes';


export default class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="container">
          <Menu />
          <br />
          <Routes />
        </div>
      </Router >
    )
  }
}