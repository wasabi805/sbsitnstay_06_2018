import React, {Component} from 'react';
import Header from './Header'
import Section from './Section'
import Elements from './Elements';
import Footer from './Footer'

class Landing  extends Component{
    render(){
        return(
            <div>

               <div id='wrapper'>
                   <Header/>
                   <Section/>
                   <Elements/>
                    <Footer/>
               </div>

                {/*BACKGROUND*/}
                <div id="bg"></div>

                {/*Scripts*/}
                <script src="assets/js/jquery.min.js"></script>
                <script src="assets/js/skel.min.js"></script>
                <script src="assets/js/util.js"></script>
                <script src="assets/js/main.js"></script>

            </div>
        )
    }
}

export default Landing