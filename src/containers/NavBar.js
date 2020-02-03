import React, { Component } from "react";
import { Header } from "semantic-ui-react";
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
          <div className="nav-bar">
            <Header
              as={Link}
              style={{ textDecoration: 'none' }}
              to={'/'}
              onClick={this.handleItemClick}>
                A look Beyond
              </Header>
          </div>
          //     pointing
          //     secondary
          //     className = "navbar-menu"
          //   >
          //   <Menu.Item
          //       
          //   />
          // </Menu>
         );
    }
}

export default NavBar;
