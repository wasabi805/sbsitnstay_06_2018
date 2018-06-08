import React, { Component } from 'react';
import Header from './components/layout/Header';
import Section from './components/layout/Section'
import Elements from './components/layout/Elements';
import Footer from './components/layout/Footer';

import Landing from './components/layout/Landing';

require("./assets/css/App.css");

class App extends Component {
  render() {
    return (
      <div className="App">
        
          <div id='wrapper'>
              <Header/>
              <Section/>
              <Elements/>
              <Footer/>
              <Landing />
          </div>

          {/*BACKGROUND*/}
          <div id="bg"></div>

          {/*Scripts*/}
          <script src="assets/js/jquery.min.js"></script>
          <script src="assets/js/skel.min.js"></script>
          <script src="assets/js/util.js"></script>
          <script src="assets/js/main.js"></script>

      </div>
    );
  }
}

export default App;
