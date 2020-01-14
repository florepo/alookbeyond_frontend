import React from 'react'
import {List, Button, Icon} from 'semantic-ui-react'

const WatchListElement = ({item, removeSatOnClick, removeSatAndConOnClick}) => {

    const handleSatClick = (item) =>{
        console.log("sat click")
        removeSatOnClick(item)
    }

    const handleConClick = (item) => {
        console.log("con click")
        removeSatAndConOnClick(item)
    }

    return ( 
        <List.Item key={item.name}>
            <List.Content floated='right'>
                <Button size='mini' icon >
                    <Icon
                        name='minus'
                        onClick={()=> handleSatClick(item)}
                    />
                </Button>
                <Button size='medium' icon >
                    <Icon
                        name='minus circle'
                        onClick={()=> handleConClick(item)}
                        />
                </Button>
            </List.Content>
            <List.Content>{item.name}</List.Content>                               
        </List.Item>
        );
}
 
export default WatchListElement;