import React from 'react'
import { List, Divider } from "semantic-ui-react";
import ElementOfConstellationList from "../components/ElementOfConstellationList";

const ConstellationCategoryList = ({constellations, category, addOnClick, removeOnClick}) => {

  return ( 
    <List>
      {constellations
        .filter(c => c.category == category)
        .map(constellation => (
          <React.Fragment>
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
  );
}

 
export default ConstellationCategoryList;