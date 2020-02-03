import React, { Component } from "react";
import { Tab, Button, Header, Icon } from "semantic-ui-react";

import ListOfConstellations from "./ListOfConstellations";
import ListOfViewElements from "../containers/ListOfViewElements";
import ListOfWatchlists from "../containers/ListOfWatchlists";
import Viewport from "./Viewport";
import ARContainer from "./ARContainer";
import SelectionContainer from "./SelectionContainer";

import { _ } from "lodash";
import * as API from "../adapters/api";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constellations: [],
      view: [],
      watchlists: [],
      arViewOpen: false,
      modalOpen: false,
      activeTabIndex: 0
    };
  }

  componentDidMount() {
    this.loadConstellationsAndWatchListsForInitialDisplay();
  }

  loadConstellationsAndWatchListsForInitialDisplay = () => {
    API.getConstellations().then(constellations =>
      this.setState({ constellations })
    );
    API.getWatchlists().then(watchlists => this.setState({ watchlists }));
  };

  addOrFetchSatsForConstellationToView = constellation => {
    if (constellation.displayed == true) {
      console.log("already selected");
    } else {
      if (!constellation.satellites) {
        this.loadSatellitesForConstellationAndAddToView(constellation);
      } else {
        let updatedConstellation = this.toggleObjectDisplayStatus(
          constellation
        );

        this.updateConstellationInConstellationsState(
          constellation,
          updatedConstellation
        );

        this.addSatellitesToView(updatedConstellation.satellites);
      }
    }
  };

  loadSatellitesForConstellationAndAddToView = constellation => {
    return API.getConstellationSats(constellation.id)
      .then(constellation => this.toggleObjectDisplayStatus(constellation))
      .then(updatedConstellation =>
        this.updateConstellationInConstellationsState(
          constellation,
          updatedConstellation
        )
      )
      .then(updatedConstellation =>
        this.addSatellitesToView(updatedConstellation.satellites)
      );
  };

  changeConstellationDisplayToFalse = constellation => {
    let constellationDisplayFalse = { ...constellation, displayed: false };
    return constellationDisplayFalse;
  };

  changeConstellationDisplayToTrue = constellation => {
    let constellationDisplayFalse = { ...constellation, displayed: true };
    return constellationDisplayFalse;
  };

  changeChildrenSatelliteDisplayToggleToFalse = constellation => {
    return constellation.satellites.map(sat => {
      sat.displayed = false;
      return sat;
    });
  };

  changeChildrenSatelliteDisplayToggleToTrue = constellation => {
    return constellation.satellites.map(sat => {
      sat.displayed = true;
      return sat;
    });
  };

  removeConstellationFromView = constellation => {
    // remove the satellites that belong to the given constellation
    const updatedViewlist = [...this.state.view].filter(
      s => s.constellation_id != constellation.id
    );

    const updatedConstellationList = [...this.state.constellations].map( c => {
      if (c.id == constellation.id) {
        // toggle Display to false for the given constellation
        let constellationDisplayToggledFalse = this.changeConstellationDisplayToFalse(
          c
        );
        // toggle Display to false for satellites in the given constellation
        if (c.satellites) {
          let childrenSatellitesDisplayToggleUpdated = this.changeChildrenSatelliteDisplayToggleToFalse(
            constellationDisplayToggledFalse
          );
          constellationDisplayToggledFalse.satellites = childrenSatellitesDisplayToggleUpdated;
        }
        return constellationDisplayToggledFalse;
      } else {
        return c;
      }
    });
    this.setState({
      view: updatedViewlist,
      constellations: updatedConstellationList
    });
  };

  updateConstellationInConstellationsState = (
    constellation,
    updatedConstellation
  ) => {
    let constellationsArray = [...this.state.constellations];
    let index = constellationsArray.indexOf(constellation);
    constellationsArray[index] = updatedConstellation;
    this.setState({ constellations: constellationsArray });
    return updatedConstellation;
  };

  addSatellitesToView = sats => {
    let satsToAdd = sats.filter(s => s.displayed != true);
    satsToAdd = satsToAdd.map(sat => this.toggleObjectDisplayStatus(sat));

    let updatedViewlist = [...this.state.view].concat(satsToAdd);
    this.setState({ view: updatedViewlist });
  };

  getListofIDsofConstellationsSavedInWatchlist = watchlist => {
    let AllConstellationIds = watchlist.satellites.map(
      sat => sat.constellation_id
    );
    let uniqueArrayOfConstellationIds = [...new Set(AllConstellationIds)];
    return uniqueArrayOfConstellationIds;
  };

  loadWatchlistInView = watchlist => {
    let satsDisplaySetToTrue = watchlist.satellites.map(s => {
      s.displayed = true;
      return s;
    });

    let constellationList = [...this.state.constellations];

    //reset view status to false for all constellations
    let constellationListSetToDisplayFalse = constellationList.map(
      constellation => {
        constellation.displayed = false;
        return constellation;
      }
    );

    let uniqueArrayOfConstellationIds = this.getListofIDsofConstellationsSavedInWatchlist(
      watchlist
    );

    let updatedConstellationList = constellationListSetToDisplayFalse.map(
      constellation => {
        return uniqueArrayOfConstellationIds.map(id => {
          if (constellation.id == id) {
            // toggle Display to false for the given constellation
            let constellationDisplayToggledTrue = this.changeConstellationDisplayToTrue(
              constellation
            );

            // toggle Display to false for satellites in the given constellation
            if (constellation.satellites) {
              let childrenSatellitesDisplayToggleUpdated = this.changeChildrenSatelliteDisplayToggleToTrue(
                constellationDisplayToggledTrue
              );
              constellationDisplayToggledTrue.satellites = childrenSatellitesDisplayToggleUpdated;
            }
            return constellationDisplayToggledTrue;
          } else {
            return constellation;
          }
        });
      }
    );
    updatedConstellationList = updatedConstellationList.flat(1);
    this.setState({
      view: satsDisplaySetToTrue,
      constellations: updatedConstellationList
    });
  };

  saveViewToWatchlist = watchlist_name => {
    let target = [...this.state.watchlists].filter(
      watchlist => watchlist.name == watchlist_name
    );
    let non_targeted = [...this.state.watchlists].filter(
      watchlist => watchlist.name != watchlist_name
    );

    let sat_ids = [...this.state.view].map(sat => sat.id);
    let data = { sat_ids: sat_ids, watchlist_id: target[0].id };

    API.updateWatchList(data, target[0].id)
      .then(response =>
        this.addResponseToArrayAndReturnCombined(non_targeted, response)
      )
      .then(watchlists => this.setState({ watchlists }));
  };

  addResponseToArrayAndReturnCombined = (arrayOfElements, itemToAdd) => {
    arrayOfElements.push(itemToAdd);
    return arrayOfElements;
  };

  toggleObjectDisplayStatus = object => {
    object.displayed = !object.displayed;
    return object;
  };

  clearView = () => {
    let disableViewforAllConstellations = [...this.state.constellations].map(
      c => {
        c.displayed = false;
        if (c.satellites) {
          c.satellites = this.changeChildrenSatelliteDisplayToggleToFalse(c);
        }
        return c;
      }
    );

    this.setState({
      view: [],
      constellations: disableViewforAllConstellations
    });
  };

  toggleARviewStatus = () =>
    this.setState({ arViewOpen: !this.state.arViewOpen });

  switchToViewTab = () => this.setState({ activeTabIndex: 1 });

  handleTabChange = (e, { activeIndex }) =>
    this.setState({ activeTabIndex: activeIndex });

  tabPanes = [
    {
      menuItem: { key: "constellation", icon: "bullseye", content: "SELECT" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>
            Satellites can be classified by their function since they are
            launched into space to do a specific job. There are nine different
            types of satellites - here there are three of them.
          </p>
          <Header style={{ fontSize: "1em" }}>
            SELECT CONSTELLATIONS TO VIEW, and see how they differ in their
            altitude and orbital shape.
          </Header>
          <p>
            <i>
              Pro tip: Hover over <Icon name="info" /> to view more details of
              that particular constellation.
            </i>
          </p>
          <ListOfConstellations
            constellations={this.state.constellations}
            addOnClick={this.addOrFetchSatsForConstellationToView}
            removeOnClick={this.removeConstellationFromView}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "view", icon: "unhide", content: "CURRENT VIEW" },
      render: () => (
        <Tab.Pane attached={false}>
          {this.state.view.length == 0 ? (
            "You have not selected any constellations to visualise. Click on SELECT tab above and start adding some satellite constellations to your view. Otherwise, click on LOAD tab above to load a saved view."
          ) : (
            <ListOfViewElements
              view={this.state.view}
              watchlists={this.state.watchlists}
              constellations={this.state.constellations}
              removeConOnClick={this.removeConstellationFromView}
              // removeSatOnClick={this.removeSatelliteFromView}
              // removeSatAndConOnClick={
              //   this.removeSatelliteWithConstellationFromView
              // }
              clearView={this.clearView}
              saveViewToWatchlist={this.saveViewToWatchlist}
            />
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "watchlists", icon: "list", content: "LOAD" },
      render: () => (
        <Tab.Pane attached={false}>
          <p>
            Select one of the saved views to visualise. You could also edit the
            view and ovewrite the list in CURRENT VIEW Tab.
          </p>
          <p>
            <i>
              (An AR version of the app is under development, so you could view
              them in AR soon!)
            </i>
          </p>
          <ListOfWatchlists
            watchlists={this.state.watchlists}
            loadWatchlistInView={this.loadWatchlistInView}
            switchToSecondTab={this.switchToViewTab}
          />
        </Tab.Pane>
      )
    }
  ];

  render() {
    return (
      <div className="main-display-container">
        {!this.state.arViewOpen ? (
          <Tab
            className="sidetabs"
            menu={{ attached: false }}
            panes={this.tabPanes}
            activeIndex={this.state.activeTabIndex}
            onTabChange={this.handleTabChange}
          />
        ) : null}
        <div className="flex-column-container">
          {!this.state.arViewOpen ? (
            <React.Fragment>
              <Viewport className="viewport" sats={this.state.view} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ARContainer
                className="ar-container"
                ARview={this.state.arViewOpen}
                sats={this.state.view}
              />
              <Button
                className="activate-ar-button"
                basic
                color="red"
                onClick={this.toggleARviewStatus}
              >
                3D View
              </Button>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default MainDisplay;
