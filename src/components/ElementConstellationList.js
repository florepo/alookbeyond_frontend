import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

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
                <Button size='mini' icon >
                    <Icon
                        name='info'
                        onClick={() => handleInfoClick(item)}
                    />
                </Button>
                {item.displayed?
                <Button size='mini' icon >
                    <Icon
                        name='unhide'
                        onClick={() => handleViewClick(item)}
                    />
                </Button>
                :
                <Button size='mini' icon >
                    <Icon
                        name='hide'
                        onClick={() => handleViewClick(item)}
                    />
                </Button>
                }
            </List.Content>
            <List.Content>
                <Header as='h5'>{item.name}</Header>
            </List.Content>                               
        </List.Item>
        );
}
 
export default ElementConstellationList;