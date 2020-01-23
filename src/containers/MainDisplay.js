import React, { Component } from "react";
import { Tab, Button, Header, Icon } from "semantic-ui-react";
import Viewport from "./Viewport";
import ARContainer from "./ARContainer";
import ListOfViewElements from "../containers/ListOfViewElements";
import ListOfConstellations from "./ListOfConstellations";
import SelectionContainer from "./SelectionContainer";
import ListOfWatchlists from "../containers/ListOfWatchlists";

import { _ } from "lodash";
import * as API from "../adapters/api";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      constellations: [],
      satellites: [],
      view: [],
      viewedConstellations: [],
      watchlists: [],
      selection: [],
      ARview: false,
      modalOpen: false,
      activeIndex: 0 
    };
  }

  componentDidMount() {
    API.getConstellations().then(constellations =>
      this.setState({ constellations })
    );
    API.getWatchlists().then(watchlists => this.setState({ watchlists }));
  }

  addOrFetchSatsForConstellationToView = constellation => {
    this.setState({ selection: [] });
    if (constellation.displayed == true) {
      console.log("already selected");
    } else if (!constellation.satellites) {
      constellation.displayed = true;
      API.getConstellationSats(constellation.id).then(constellation =>
        this.addSatellitesToView(constellation.satellites)
      );
      let viewedConstellationList = [...this.state.viewedConstellations];
      viewedConstellationList.push(constellation);
      this.setState({ viewedConstellations: viewedConstellationList })
    } else {
      constellation.displayed = true;
      let sats = [...constellation.satellites];
      let updatedViewlist = [...this.state.view];
      updatedViewlist.concat(sats);

      let viewedConstellationList = [...this.state.viewedConstellations];
       viewedConstellationList.push(constellation);
      
        this.setState({
            view: updatedViewlist,
            viewedConstellations: viewedConstellationList
        })
    }
  };

  addSatellitesToView = sats => {
    this.setState({ selection: [] });
    let satsToAdd = sats.filter(s => s.displayed != true);
    let updatedViewlist = [...this.state.view].concat(satsToAdd);
    this.setState({ view: updatedViewlist });
  };

  addSatelliteToView = sat => {
    if (!!this.state.view.find(s => s == sat)) {
    } else {
      sat.displayed = true;
      let updatedViewlist = [...this.state.view].concat(sat);
      this.setState({ view: updatedViewlist });
    }
  };

  removeSatelliteFromView = sat => {
      console.log("sat removed")
    sat.displayed = false;
    let updatedViewlist = [...this.state.view].filter(s => s.id != sat.id);
    this.setState({ view: updatedViewlist });
  };

  removeConstellationFromView = constellation => {
    constellation.displayed = false;
    let updatedViewlist = [...this.state.view].filter(
      s => s.constellation_id != constellation.id
    );

    let viewedConstellationsWithoutSelectedConstellation = [
      ...this.state.viewedConstellations
    ].filter(c => c.id != constellation.id);
    this.setState({
      view: updatedViewlist,
      viewedConstellations: viewedConstellationsWithoutSelectedConstellation
    });
  };

  removeSatelliteWithConstellationFromView = sat => {
    sat.displayed = false;

    let constellationList = [...this.state.constellations];

    let constellationWithSatelliteArray = constellationList.filter(
      c => c.id == sat.constellation_id
    );

    constellationWithSatelliteArray[0].displayed = false;
    let updatedConstellationToNotBeDisplayed =
      constellationWithSatelliteArray[0];

    let constellationsWithoutSat = constellationList.filter(
      c => c.id != sat.constellation_id
    );

    constellationsWithoutSat.push(updatedConstellationToNotBeDisplayed);
    let allConstellationsWithCorrectDisplayAttribute = constellationsWithoutSat;

    let updatedSatellitesToViewArray = [...this.state.view].filter(
      s => s.constellation_id != updatedConstellationToNotBeDisplayed.id
    );

    this.setState({
      constellations: allConstellationsWithCorrectDisplayAttribute,
      view: updatedSatellitesToViewArray
    });
  };

  showConstellationInfoOnClick = item => {
    this.setState({ selection: [item] });
  };

loadWatchlistInView = list => {

    let SatelliteConstellationIdArray =  list.satellites.map( sat => sat.constellation_id)
    let uniqueArrayOfConstellationIds = [...new Set(SatelliteConstellationIdArray)]

    let constellationList = [...this.state.constellations]

    let matchedConstellationsArray =uniqueArrayOfConstellationIds.map( ID => {
            return constellationList.filter(constellation => constellation.id == ID)[0]
        }
    )

    let matchedUniqueConstellationsArray = [...new Set(matchedConstellationsArray)]
    this.setState({ view: list.satellites, viewedConstellations: matchedUniqueConstellationsArray });
    };

    clearView = () => {
    let disableViewforAllConstellations = [...this.state.constellations].map( c => c.displayed = false)
    this.setState({ view: [], constellatiom: disableViewforAllConstellations });

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

  toggleARview = () => {
    this.setState({ ARview: !this.state.ARview });
  };

  clearSelectionContainer = () => {
    this.setState({ selection: [] });
  };

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex, selection: [] });
  };

  switchToSecondTab = () => this.setState({ activeIndex: 1 });

  panes = [
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
            showInfoOnClick={this.showConstellationInfoOnClick}
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
              removeSatOnClick={this.removeSatelliteFromView}
              removeConOnClick={this.removeConstellationFromView}
              removeSatAndConOnClick={
                this.removeSatelliteWithConstellationFromView
              }
              clearView={this.clearView}
              saveViewToWatchlist={this.saveViewToWatchlist}
              constellationsInView={this.state.viewedConstellations}
            />
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: "watchlists", icon: "list", content: "LOAD" },
      render: () => (
        <Tab.Pane attached={false}>
          <ListOfWatchlists
            watchlists={this.state.watchlists}
            loadWatchlistInView={this.loadWatchlistInView}
            switchToSecondTab={this.switchToSecondTab}
          />
        </Tab.Pane>
      )
    }
  ];

  render() {
    return (
      <div className="main-display-container">
        <Tab
          inverted
          className="sidetabs"
          menu={{ attached: false }}
          panes={this.panes}
          activeIndex={this.state.activeIndex}
          onTabChange={this.handleTabChange}
        />
        <div className="flex-column-container">
          {!this.state.ARview ? (
            <React.Fragment>
              <Viewport
                className="viewport"
                sats={this.state.view}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ARContainer ARview={this.state.ARview} sats={this.state.view} />
              <Button
                className="activate-ar-button"
                basic
                color="red"
                onClick={this.toggleARview}
              >
                3D View
              </Button>
            </React.Fragment>
          )}

          {/* <SelectionContainer
            className="selection-container"
            // info={this.state.selection}
          /> */}
        </div>
      </div>
    );
  }
}

export default MainDisplay;
