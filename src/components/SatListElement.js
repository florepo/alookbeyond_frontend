import React from "react";
import { List, Button, Icon, Header } from "semantic-ui-react";

const SatListElement = ({ item, addOnClick, removeOnClick }) => {

  const handleClick = item => {
    debugger
    if (item.displayed) {
      removeOnClick(item);
    } else {
      addOnClick(item);
    }
  };
 
  if (!item.constellation) return <div></div>;
  return (
    <List.Item key={item.name} onClick={() => handleClick(item)}>
      <List.Content floated="right">
        {item.displayed ? (
          <Button size="mini" icon>
            <Icon name="hide" />
          </Button>
        ) : (
          <Button size="mini" icon>
            <Icon name="unhide" />
          </Button>
        )}
      </List.Content>
      <List.Content>
        <Header as="h5">{item.name}</Header>
        <Header as="h6">part of {item.constellation.name}</Header>
      </List.Content>
    </List.Item>
  );
};

export default SatListElement;
