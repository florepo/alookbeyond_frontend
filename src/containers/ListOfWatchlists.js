import React, { Component } from "react";
import { Tab, Ite, Icon, List, Button, Segment } from "semantic-ui-react";

import ElementWatchlist from "../components/ElementWatchlist";

class ListOfWatchlists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { watchlists, loadWatchlistInView, switchToSecondTab } = this.props;
    return (
      <Segment attached>
        <List divided verticalAlign="middle">
          {watchlists.map(item => (
            <ElementWatchlist
              key={item.name}
              item={item}
              loadWatchlistInView={loadWatchlistInView}
              switchToSecondTab={switchToSecondTab}
            />
          ))}
        </List>
      </Segment>
    );
  }
}

export default ListOfWatchlists;
