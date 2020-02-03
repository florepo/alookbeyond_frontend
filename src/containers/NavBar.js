import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
            <Menu
              pointing
              secondary
              className = "navbar-menu"
            >
            <Menu.Item
                as={Link}
                to={'/'}
                name='A Look Beyond'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
            />
          </Menu>
         );
    }
}

export default NavBar;
