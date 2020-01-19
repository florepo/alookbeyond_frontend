import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ConstListElement = ({item, addOnClick, removeOnClick}) => {
    const handleClick = (item) => {
        console.log("clicked")

        if (item.displayed){
            console.log("remove")
            removeOnClick(item)
         } else {
            console.log("add")
            console.log(addOnClick)
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
                    <Icon name='unhide'/>
                </Button>
                :
                <Button size='mini' icon >
                    <Icon name='hide'/>
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