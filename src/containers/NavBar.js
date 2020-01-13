import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import {Container, Grid} from 'semantic-ui-react'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Container className="NavBar">
                {/* <SearchBar /> */}
            </Container>
         );
    }
}
 
export default NavBar;