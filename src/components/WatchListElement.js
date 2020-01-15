import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const WatchListElement = ({item, removeSatOnClick, removeSatAndConOnClick}) => {

    const handleSatClick = (item) =>{
        debugger
        removeSatOnClick(item)
    }

    const handleConClick = (item) => {
        removeSatAndConOnClick(item)
    }

    if (!item.constellation) return <div></div>;
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
            <List.Content>
                <Header as="h5">{item.name}</Header>
                <Header as="h6">part of {item.constellation.name}</Header>
            </List.Content>                               
        </List.Item>
        );
}
 
export default WatchListElement;