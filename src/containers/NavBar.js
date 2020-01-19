import React,{Component} from 'react'
import {Menu, Dropdown, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'





class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: '3dview'   }
    }

    handleClick = () => {
        console.log("clicked")
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
                <Menu.Menu position='right'>
                <Menu.Item
                    name='AR-Preview'
                    active={activeItem === 'arview'}
                    onClick={this.handleItemClick}
                />
                <Menu vertical>
                    <Dropdown item text='Watchlists'>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Alpha
                            <Icon
                                name='load'
                                onClick={() => this.handleClick()}
                            />
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Bravo
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Charlie
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Delta
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Menu>
                </Menu.Menu>
          </Menu>
         );
    }
}
 
export default NavBar;