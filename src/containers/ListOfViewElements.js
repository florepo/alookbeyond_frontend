import React, { Component } from "react";
import {
  Tab,
  List,
  Button,
  Segment,
  Header,
  Popup,
  Icon
} from "semantic-ui-react";

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
        <p>
          You could go back to SELECT Tab to add more constellations to this
          view.
        </p>
        <Button color="green" attached="top" onClick={this.show}>
          Save Current View
        </Button>
        <p></p>
        <Header as="h6">Reset View</Header>
        <Segment attached>
          <List divided verticalAlign="middle">
            <List.Item key="RemoveAll">
              <List.Content floated="right">
                <Popup
                  basic
                  content="Remove Everything!"
                  trigger={
                    <Button
                      color="orange"
                      icon
                      onClick={this.handleClearButtonClick}
                    >
                      <Icon name="window close" />
                    </Button>
                  }
                />
              </List.Content>
              <List.Content>Remove Everything!</List.Content>
            </List.Item>
          </List>
        </Segment>

        <p></p>
        <Header as="h6">Remove By Constellation:</Header>
        <Segment attached>
          <List divided verticalAlign="middle">
            {constellationsInView.map(constellation => (
              <ElementViewConstellation
                item={constellation}
                removeConOnClick={removeConOnClick}
              />
            ))}
          </List>
        </Segment>
        <p></p>
        <Header as="h6">Remove By Individual Satellites:</Header>
        <Segment attached>
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
