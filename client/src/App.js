import React, { Component } from 'react';
import Header from './components/layout/Header';

import Landing from './components/layout/Landing';

import './assets/css/App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/*<h1>Hello World</h1>*/}
        <Landing />
        {/*<Header/>*/}

      </div>
    );
  }
}

export default App;
