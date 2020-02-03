import React from 'react'
import {List, Button, Icon, Header, Popup} from 'semantic-ui-react'

const ElementOfConstellationList = ({item, addOnClick, removeOnClick}) => {
    
    const handleViewClick = (item) => {
        if (item.displayed) { removeOnClick(item) }
        else { addOnClick(item)}
    }

    return ( 
        <List.Item
            key={item.name}
        >
            <List.Content floated='right'>
                <Popup wide
                    basic trigger={
                            <Icon name='info' />
                    }
                > 
                    {item.description}
                </Popup>

                {item.displayed
                ?
                <Popup
                    basic content='Hide Constellation from View' 
                    trigger={
                        <Button icon color='green' onClick={() => handleViewClick(item)}>
                            <Icon name ='unhide' />
                        </Button>
                    }
                />
                :
                <Popup
                    basic content='Show Constellation in View'
                    trigger={
                        <Button icon color='blue' onClick={() => handleViewClick(item)}>
                            <Icon name='hide' />
                        </Button>
                 }/>
                }
            </List.Content>
            <List.Content>
                <Header as='h5'>{item.name}</Header>
            </List.Content>                               
        </List.Item>
        );
}
 
export default ElementOfConstellationList;