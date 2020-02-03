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
        return (
          <div className="nav-bar">
            <Header
              as={Link}
              style={{ textDecoration: 'none' }}
              to={'/'}
              onClick={this.handleItemClick}>
                A Look Beyond
              </Header>
          </div>
         );
    }
}

export default NavBar;
