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
      viewedConstellations: [],
      arViewOpen: false,
      modalOpen: false,
      activeTabIndex: 0
    };
  }

  componentDidMount() {
    API.getConstellations()
      .then(constellations => this.setState({ constellations }));
    API.getWatchlists()
      .then(watchlists => this.setState({ watchlists }));
  }

  addOrFetchSatsForConstellationToView = constellation => {
    if (constellation.displayed == true) {
      console.log("already selected");

    } else {
      if (!constellation.satellites){
        this.loadSatellitesForConstellationAndAddToView(constellation)
      } else {
        let updatedConstellation = this.toggleObjectDisplayStatus(constellation)
        this.updateConstellationInConstellationsState(constellation,updatedConstellation)
        this.addConstellationToConstellationViewList(updatedConstellation)
        this.addSatellitesToView(updatedConstellation.satellites)
      }
    };
  }

  loadSatellitesForConstellationAndAddToView = (constellation) => {
    return API.getConstellationSats(constellation.id)
      .then(constellation => this.toggleObjectDisplayStatus(constellation))
      .then(updatedConstellation => this.updateConstellationInConstellationsState(constellation,updatedConstellation))
      .then(updatedConstellation => this.addConstellationToConstellationViewList(updatedConstellation))
      .then(updatedConstellation => this.addSatellitesToView(updatedConstellation.satellites))
  }



  updateConstellationInConstellationsState = (constellation, updatedConstellation) => {
    let constellationsArray = [...this.state.constellations]
    let index = constellationsArray.indexOf(constellation)
    constellationsArray[index] = updatedConstellation
    this.setState({constellations: constellationsArray})
    return updatedConstellation
  }

  addConstellationToConstellationViewList = constellation => {
    if ( ![...this.state.viewedConstellations].includes(constellation)){
        let list = [...this.state.viewedConstellations];
        list.push(constellation);
        this.setState({viewedConstellations: list})
    }
    return constellation
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


  addSatellitesToView = sats => {
    let satsToAdd = sats.filter(s => s.displayed != true);
    satsToAdd = satsToAdd.map( sat => this.toggleObjectDisplayStatus(sat) )

    let updatedViewlist = [...this.state.view].concat(satsToAdd);
    this.setState({ view: updatedViewlist })
  };

  addSatellitesToView = sats => {
    let satsToAdd = sats.filter(s => s.displayed != true);
    let updatedViewlist = [...this.state.view].concat(satsToAdd);
    this.setState({ view: updatedViewlist })
  };

  // addSatellitesToView = sats => {
  //   let satsToAdd = sats.filter(s => s.displayed != true);

  //   satsToAdd = satsToAdd.map( sat => {
  //     sat.displayed = true
  //     return sat
  //   })

  //   let updatedViewlist = [...this.state.view].concat(satsToAdd);
  //   this.setState({ view: updatedViewlist })
  // }
 
  
  // addSatelliteToView = sat => {
  //   if (!!this.state.view.find(s => s == sat)) {
  //   } else {
  //     sat.displayed = true;
  //     let updatedViewlist = [...this.state.view].concat(sat);
  //     this.setState({ view: updatedViewlist });
  //   }
  // };

  // removeSatelliteFromView = sat => {
  //   console.log("sat removed");
  //   sat.displayed = false;
  //   let updatedViewlist = [...this.state.view].filter(s => s.id != sat.id);
  //   this.setState({ view: updatedViewlist });
  // };

  // removeSatelliteWithConstellationFromView = sat => {
  //   sat.displayed = false;

  //   let constellationList = [...this.state.constellations];

  //   let constellationWithSatelliteArray = constellationList.filter(
  //     c => c.id == sat.constellation_id
  //   );

  //   constellationWithSatelliteArray[0].displayed = false;
  //   let updatedConstellationToNotBeDisplayed =
  //     constellationWithSatelliteArray[0];

  //   let constellationsWithoutSat = constellationList.filter(
  //     c => c.id != sat.constellation_id
  //   );

  //   constellationsWithoutSat.push(updatedConstellationToNotBeDisplayed);
  //   let allConstellationsWithCorrectDisplayAttribute = constellationsWithoutSat;

  //   let updatedSatellitesToViewArray = [...this.state.view].filter(
  //     s => s.constellation_id != updatedConstellationToNotBeDisplayed.id
  //   );

  //   this.setState({
  //     constellations: allConstellationsWithCorrectDisplayAttribute,
  //     view: updatedSatellitesToViewArray
  //   });
  // };

  loadWatchlistInView = list => {

    let SatelliteConstellationIdArray = list.satellites.map(
      sat => sat.constellation_id
    );
    let uniqueArrayOfConstellationIds = [
      ...new Set(SatelliteConstellationIdArray)
    ];

    let constellationList = [...this.state.constellations];

    let matchedConstellationsArray = uniqueArrayOfConstellationIds.map(ID => {
      return constellationList.filter(
        constellation => constellation.id == ID
      )[0];
    });

    let matchedUniqueConstellationsArray = [
      ...new Set(matchedConstellationsArray)
    ];

    this.setState({
      view: list.satellites,
      viewedConstellations: matchedUniqueConstellationsArray
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

  toggleObjectDisplayStatus = (object) => {
    object.displayed =  !object.displayed 
    return object
  }

  clearView = () => {
    let disableViewforAllConstellations = [...this.state.constellations].map(
      c => (c.displayed = false)
    );
    this.setState({ view: [], constellatiom: disableViewforAllConstellations });
  };

  toggleARviewStatus = () => this.setState({ arViewOpen: !this.state.arViewOpen });

  switchToViewTab = () => this.setState({ activeIndex: 1 });

  handleTabChange = (e, { activeTabIndex }) => this.setState({ activeTabIndex });

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
            // showInfoOnClick={this.showConstellationInfoOnClick}
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
        {!this.state.arViewOpen? 
          <Tab className="sidetabs"
            menu={{ attached: false }}
            panes={this.tabPanes}
            activeIndex={this.state.activeTabIndex}
            onTabChange={this.handleTabChange}
          />
          :
          null
        }
        <div className="flex-column-container">
          {!this.state.arViewOpen ? (
            <React.Fragment>
              <Viewport
                className="viewport"
                sats={this.state.view} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ARContainer className="ar-container"
                ARview={this.state.arViewOpen} 
                sats={this.state.view} />
              <Button className="activate-ar-button"
                basic
                color="red"
                onClick={this.toggleARviewStatus}
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
