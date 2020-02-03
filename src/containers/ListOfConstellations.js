import React, { Component } from "react";
import { Accordion, Icon, List, Divider } from "semantic-ui-react";
import ElementOfConstellationList from "../components/ElementOfConstellationList";

class ListOfConstellations extends Component {
  state = { activeIndex: 0 };

  handleClickOnTabTitle = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    const {
      constellations,
      addOnClick,
      removeOnClick,
    } = this.props;

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClickOnTabTitle}
        >
          <Icon name="dropdown" />
          Navigation & Positioning
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <List>
            {constellations
              .filter(c => c.category == "Navigation & Positioning")
              .map(constellation => (
                <React.Fragment key={constellation.name}>
                  <ElementOfConstellationList
                    key={constellation.name}
                    item={constellation}
                    addOnClick={addOnClick}
                    removeOnClick={removeOnClick}
                  />
                  <Divider />
                </React.Fragment>
              ))}
          </List>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClickOnTabTitle}
        >
          <Icon name="dropdown" />
          Communication
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <List>
            {constellations
              .filter(c => c.category == "Communication")
              .map(constellation => (
                <ElementOfConstellationList
                  key={constellation.name}
                  item={constellation}
                  addOnClick={addOnClick}
                  removeOnClick={removeOnClick}
                />
              ))}
          </List>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClickOnTabTitle}
        >
          <Icon name="dropdown" />
          Weather and Earth Resources
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <List>
            {constellations
              .filter(c => c.category == "Weather and Earth Resources")
              .map(constellation => (
                <ElementOfConstellationList
                  key={constellation.name}
                  item={constellation}
                  addOnClick={addOnClick}
                  removeOnClick={removeOnClick}
                />
              ))}
          </List>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default ListOfConstellations;
