import React from "react";
import { List, Button, Icon, Header, Popup } from "semantic-ui-react";

const ElementViewList = ({
  item,
  removeSatOnClick,
  removeSatAndConOnClick,
  constellationOfSelectedSatellite,
  findConstellationOfSelectedSatellite
}) => {
  const handleSatClick = item => {
    console.log("remove sat on click");
    removeSatOnClick(item);
  };

  return (
    <React.Fragment>
      <List.Item key={item.name}>
        <List.Content floated="right">
        <Popup basic content='Add users to your feed' trigger={
          <Button color='orange' icon onClick={() => handleSatClick(item)}>
            <Icon name="window close"  />
          </Button>
        }/>

        </List.Content>
        <List.Content>
          <Header as="h6">{item.name}</Header>
          {constellationOfSelectedSatellite ? (
            <Header as="h6">{constellationOfSelectedSatellite.name}</Header>
          ) : null}
        </List.Content>
      </List.Item>
    </React.Fragment>
  );
};

export default ElementViewList;
