import React, {Component} from 'react';
import Header from './Header'
import Article from './Section';


class Landing  extends Component{
    render(){
        return(
           <div id='wrapper'>
                <Header/>
                 <Article/>
           </div>
        )
    }
}

export default Landing