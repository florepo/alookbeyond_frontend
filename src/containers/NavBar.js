import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DropdownWatchlists from "../backup/DropdownWatchlists";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: "3dview" };
  }

  handleWatchListClick = id => {
    console.log("clicked", id);
    this.props.onClick(id);
  };

    render() { 
        const { activeItem } = this.state
        return ( 
            <Menu pointing secondary>
                <Menu.Item
                    as={Link}
                    to={'/'}
                    name='A Look Beyond'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    {/* <Menu.Item
                        name='AR-Preview'
                        active={activeItem === 'arview'}
                        onClick={this.handleItemClick}
                    /> */}
                </Menu.Menu>
          </Menu>
         );
    }
}

export default NavBar;
