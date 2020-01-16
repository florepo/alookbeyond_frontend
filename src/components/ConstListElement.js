import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ConstListElement = ({item, addOnClick, removeOnClick}) => {

    const handleClick = (item) => {
        console.log("clicked here")

        if (item.displayed){
            removeOnClick(item)
         } else {
            console.log(addOnClick)
            addOnClick(item.id)
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
            <List.Content>
                <Header as='h5'>{item.name}</Header>
            </List.Content>                               
        </List.Item>
        );
}
 
export default ConstListElement;