import React, { Component } from "react";
import { Accordion, Icon, List, Divider } from "semantic-ui-react";
import ElementOfConstellationList from "../components/ElementOfConstellationList";
import ConstellationCategoryList from "../components/ConstellationCategoryList"

class ListOfConstellations extends Component {
  state = { activeIndex: 0 };

  handleClickOnTabTitle = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { constellations, addOnClick, removeOnClick} = this.props;
    const { activeIndex } = this.state;

    return (
      <Accordion>
        
        <Accordion.Title active={activeIndex === 0}
          index={0}
          onClick={this.handleClickOnTabTitle}>
          <Icon name="dropdown" />
          Navigation & Positioning
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 0}>
          <ConstellationCategoryList 
            category={"Navigation & Positioning"}
            constellations={constellations}
            addOnClick={addOnClick}
            removeOnClick={removeOnClick}
          />
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 1}
          index={1}
          onClick={this.handleClickOnTabTitle}>
          <Icon name="dropdown" />
          Communication
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 1}>
          <ConstellationCategoryList 
            category={"Communication"}
            constellations={constellations}
            addOnClick={addOnClick}
            removeOnClick={removeOnClick}
          />
        </Accordion.Content>

        <Accordion.Title active={activeIndex === 2}
          index={2}
          onClick={this.handleClickOnTabTitle}>
          <Icon name="dropdown" />
          Weather and Earth Resources
        </Accordion.Title>

        <Accordion.Content active={activeIndex === 2}>
          <ConstellationCategoryList 
            category={"Weather and Earth Resources"}
            constellations={constellations}
            addOnClick={addOnClick}
            removeOnClick={removeOnClick}
          />
        </Accordion.Content>

      </Accordion>
    );
  }
}

export default ListOfConstellations;
