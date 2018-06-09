import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer'

// require("../../assets/css/App.css");

class Landing  extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Footer/>
            </div>
        )
    }
}

export default Landing