import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

// import {Canvas, useRender} from "react-three-fiber"
// import {BoxTest} from '../backup/BoxTest'

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="a look beyond"
      inverted
      style={{
        fontSize: mobile ? "2em" : "8em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />
    <Header
      as="h2"
      content="...visualising real-time satellite constellations"
      inverted
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

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
          className="welcomeBackground"
        >
          <Segment
            textAlign="center"
            style={{ minHeight: 700, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                {/* <Menu.Item as={Link} to={'/'} active>
                    Welcome
                </Menu.Item> */}
                {/* <Menu.Item as={Link} to={'/home'}>
                    Explore
                </Menu.Item>
                <Menu.Item as={Link} to={'/demo'}>
                    Demo
                </Menu.Item> */}
              </Container>
            </Menu>
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
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          {/* <Grid.Column width={8}> */}
          {/* <Header as='h3' style={{ fontSize: '2em' }}   textAlign='center' verticalAlign='middle'>
              Explanation
            </Header> */}
          <br></br>
          <p style={{ fontSize: "2em" }}>
            "A Look Beyond" is a 3D visualisation of satellite constellations,
            based on <b>real-time orbital tracking data</b>.
          </p>
          <p style={{ fontSize: "2em" }}>
            Explore constellations of 11 satellites from 3 different categories
            of uses:
          </p>
          <p style={{ fontSize: "2em" }}>
            <ul>
              <li>Navigation & Positioning</li>
              <li>Communication</li>
              <li>Weather & Earth Resources</li>
            </ul>
          </p>
          {/* </Grid.Column>
          <Grid.Column floated='right' width={6}>
          </Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column floated="right" width={14}>
            <Header as="h2" style={{ fontSize: "4em" }}>
              NAVIGATING IN THE APP
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              <Icon name="bullseye" /> SELECT
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              In this tab, select the satellite constellation(s) that you want
              to add to View.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              <Icon mini name="hide" />
              <Icon mini name="unhide" />
              Click to show/hide constellation
              <br></br>
              <br></br>
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={7}>
            <Image
              rounded
              size="large"
              src="./assets/images/SelectConstellations.png"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              <Icon name="unhide" /> CURRENT VIEW
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Customise what satellites or constellations that you want in View.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              Save your selection and load them up for viewing later.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              <i>
                (An AR version of the app is under development, so you could
                view them in AR soon!)
              </i>
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={7}>
            <Image
              rounded
              size="large"
              src="./assets/images/Welcome_Customize.png"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={7}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              <Icon name="list" /> LOAD
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Load your list of saved Views from here.
            </p>
            <p style={{ fontSize: "1.33em" }}>
              <i>
                (An AR version of the app is under development, so you could
                view them in AR soon!)
              </i>
            </p>
          </Grid.Column>
          <Grid.Column floated="right" width={7}>
            <Image
              rounded
              size="large"
              src="./assets/images/Welcome_Load.png"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          {/* <Grid.Row> */}
          <Grid.Column width={3}>
            {/* <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact</List.Item>
              </List> */}
          </Grid.Column>
          <Grid.Column width={7}>
            {/* <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p> */}
          </Grid.Column>
          {/* </Grid.Row> */}
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);

export default HomepageLayout;
