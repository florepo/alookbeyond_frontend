import React from 'react'
import {List, Button, Icon, Image} from 'semantic-ui-react'

const ListElement = ({item, addOnClick, removeOnClick}) => {

    const handleClick = (item) => {
        console.log("clicked")
        if (item.displayed){
            removeOnClick(item)
         } else {
            addOnClick(item)
         }
    }

    return ( 
        <List.Item
            key={item.name}
            onClick={() => handleClick(item)}
        >
            <List.Content floated='right'>
                {item.displayed?
                <Button size='mini' icon >
                    <Icon name='hide'/>
                </Button>
                :
                <Button size='mini' icon >
                    <Icon name='unhide'/>
                </Button>
                }
            </List.Content>
            <List.Content>{item.name}</List.Content>                               
        </List.Item>
        );
}
 
export default ListElement;