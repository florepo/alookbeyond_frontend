import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ElementViewList = ({item, removeSatOnClick, removeSatAndConOnClick, constellationOfSelectedSatellite}) => {
    const handleSatClick = (item) =>{ 
        console.log("remove sat on click")
        removeSatOnClick(item)
    }

    return ( 
        <React.Fragment>
            <List.Item key={item.name}>
                <List.Content floated='right'>
                    <Button size='mini' icon >
                        <Icon
                            name='window close'
                            onClick={()=> handleSatClick(item)}
                        />
                    </Button>
                </List.Content>
                <List.Content>
                    <Header as="h6">{item.name}</Header>
                    <Header as="h6">{constellationOfSelectedSatellite.name}</Header>
                </List.Content>               
            </List.Item>
        </React.Fragment>
        );
}
 
export default ElementViewList;