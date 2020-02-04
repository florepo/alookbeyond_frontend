import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="a look beyond"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "0em"
      }}
    />
    <Header
      inverted
      as="h2"
      content="...visualising real-time satellite constellations"
      style={{
        fontSize: mobile ? "1.5em" : "3em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <Button secondary size="huge" as={Link} to={"/home"}>
      explore
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

// /* Heads up!
//  * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
//  * It can be more complicated, but you can create really flexible markup.
//  */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            textAlign="center"
            style={{ minHeight: 60, padding: "1em 1em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            ></Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <React.Fragment>
      <Segment verticaltyle={{ padding: "4em 0em" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <p style={{ fontSize: "1.5em" }}>
              "A Look Beyond" is a 3D visualisation of{" "}
              <b>satellite constellations</b>, based on{" "}
              <b>real-time orbital tracking data</b>.
            </p>
            <p style={{ fontSize: "1.5em" }}>
              Explore constellations of 11 satellites from 3 different
              categories of uses:
            </p>
          </Grid.Row>
          <Grid.Row>
            <ul style={{ fontSize: "1.5em" }}>
              <li>
                <b>Navigation & Positioning</b>
              </li>
              <li>
                <b>Communication</b>
              </li>
              <li>
                <b>Weather & Earth Resources</b>
              </li>
            </ul>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "4em 3em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column floated="right">
              <Header as="h2" style={{ fontSize: "3em" }}>
                HOW TO USE THE APP
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column verticalAlign="top">
              <Header as="h3" style={{ fontSize: "2em" }}>
                <Icon name="bullseye" />
                SELECT
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                In this tab, select the satellite constellation(s) that you want
                to add to View.
              </p>
              <p style={{ fontSize: "1.33em" }}>
                <Icon name="hide" />
                <Icon name="unhide" />
                Click to show/hide constellation
              </p>
            </Grid.Column>
            <Grid.Column verticalAlign="top">
              <div>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  <Icon name="unhide" />
                  VIEW
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Customise what constellations that you want in View.
                </p>
                <p style={{ fontSize: "1.33em" }}>
                  Save your selection and load them up for viewing later.
                </p>
              </div>
            </Grid.Column>
            <Grid.Column verticalAlign="top">
              <div>
                <Header as="h3" style={{ fontSize: "2em" }}>
                  <Icon name="list" />
                  LOAD
                </Header>
                <p style={{ fontSize: "1.33em" }}>
                  Load your list of saved Views from from this tab.
                </p>
                <p style={{ fontSize: "1.33em" }}>
                  <i>
                    (An AR version of the app is under development, so stay
                    tuned for the upcoming release!)
                  </i>
                  &nbsp;
                </p>
                
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  </ResponsiveContainer>
);

export default HomepageLayout;
