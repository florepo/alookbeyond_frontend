import React, { Component } from "react";
import { Tab, List, Button, Segment, Confirm } from "semantic-ui-react";

import ElementViewList from "../components/ElementViewList";
import ElementViewConstellation from "../components/ElementViewConstellation";
import ModalSaveView from "../components/ModalSaveView";

class ListOfViewElements extends Component {
  constructor(props) {
    super(props);
    this.state = { modelOpen: false };
  }

  show = () => {
    console.log("show modal");
    this.setState({ modelOpen: true });
  };

  handleClearButtonClick = () => {
    console.log("clearview");
    this.props.clearView();
  };

  handleModalClose = () => {
    this.setState({ modelOpen: false });
  };

  handleModalConfirm = item => {
    this.setState({ modelOpen: false });
    this.props.saveViewToWatchlist(item);
  };

  findConstellationOfSelectedSatellite = (constellations, item) => {
    return constellations.find(c => c.id == item.constellation_id);
  };

  render() {
    const {
      view,
      constellations,
      constellationsInView,
      removeConOnClick
    } = this.props;
    return (
      <React.Fragment>
        <ModalSaveView
          modalOpen={this.state.modelOpen}
          handleClose={this.handleModalClose}
          handleConfirm={this.handleModalConfirm}
          valueIntoModal={this.props.watchlists}
        />

        <Button attached="top" onClick={this.show}>
          Save current Selection
        </Button>

        <Button attached="top" onClick={this.handleClearButtonClick}>
          Clear all from View
        </Button>

        <Segment attached>
          Remove all Satellites from:
          <List divided verticalAlign="middle">
            {constellationsInView.map(constellation => (
              <ElementViewConstellation
                item={constellation}
                removeConOnClick={removeConOnClick}
              />
            ))}
          </List>
        </Segment>

        <Segment attached>
        Remove Satellites:
          <List divided verticalAlign="middle">
            {view.map(item => (
              <ElementViewList
                key={item.name}
                item={item}
                removeSatOnClick={this.props.removeSatOnClick}
                removeSatAndConOnClick={this.props.removeSatAndConOnClick}
                constellationOfSelectedSatellite={this.findConstellationOfSelectedSatellite(
                  constellations,
                  item
                )}
                findConstellationOfSelectedSatellite={item =>
                  this.findConstellationOfSelectedSatellite(
                    constellations,
                    item
                  )
                }
              />
            ))}
          </List>
        </Segment>
      </React.Fragment>
    );
  }
}

export default ListOfViewElements;
