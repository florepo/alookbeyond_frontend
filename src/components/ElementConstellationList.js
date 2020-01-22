import React from 'react'
import {List, Button, Icon, Header, Popup} from 'semantic-ui-react'

const ElementConstellationList = ({item, addOnClick, removeOnClick, showInfoOnClick}) => {
    
    const handleInfoClick = (item) => {
        console.log("clicked")
        showInfoOnClick(item)
    }

    const handleViewClick = (item) => {
        console.log("clicked")

        if (item.displayed){
            console.log("remove")
            removeOnClick(item)
         } else {
            console.log("add")
            addOnClick(item)
         }
    }

    return ( 
        <List.Item
            key={item.name}
        >
            <List.Content floated='right'>
                <Popup basic trigger={
                    <Button icon onClick={() => handleInfoClick(item)}>
                        <Icon name='info' />
                    </Button>
                 } wide> {item.description}</Popup>
                {item.displayed?
                 <Popup basic content='Hide Constellation from View' trigger={
                    <Button  color='green' icon onClick={() => handleViewClick(item)}>
                        <Icon name ='unhide' />
                    </Button>
                }/>
                :
                <Popup basic content='Show Constellation in View' trigger={
                    <Button color='blue' icon onClick={() => handleViewClick(item)}>
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
 
export default ElementConstellationList;