import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'
import {Menu, Container, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: '3dview'   }
    }
    render() { 
        const { activeItem } = this.state
        return ( 
            <Menu pointing secondary>
                <Menu.Item
                as={Link}
                to={'/'}
                name='Welcome'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                as={Link}
                to={'/home'}
                name="3D-view"
                active={activeItem === '3Dview'}
                onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                <Menu.Item
                name='AR-view'
                active={activeItem === 'arview'}
                onClick={this.handleItemClick}
                />
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                />
                </Menu.Menu>
          </Menu>
         );
    }
}
 
export default NavBar;