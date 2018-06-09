import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import Header from "./components/layout/Header"
import Section from './components/layout/Section'
import Elements from './components/layout/Elements';


import Landing from './components/layout/Landing'

require("./assets/css/App.css");

class App extends Component {
  render() {
    return (

        <Router>
          <div className="App">
              <div id='wrapper'>
                  {/*<Header/>*/}
                  {/*<Section/>*/}
                  {/*<Elements/>*/}

                  <Route path ="/" component={Landing}/>
              </div>

              BACKGROUND
              <div id="bg"></div>

              {/*Scripts*/}
              <script src="assets/js/jquery.min.js"></script>
              <script src="assets/js/skel.min.js"></script>
              <script src="assets/js/util.js"></script>
              <script src="assets/js/main.js"></script>

          </div>
        </Router>
    );
  }
}

export default App;
