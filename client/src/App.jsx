import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Viewport from './components/Viewport';

class App extends Component {
  doLogout() {
    localStorage.setItem('uuID', '');
    window.location = '/';
  }

  render() {
    return (
      <Router>
          <Route path="/" render={() => <Viewport/>} exact />
      </Router>
    );
  }
}

export default App;
