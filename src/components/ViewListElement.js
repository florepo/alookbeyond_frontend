import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ViewListElement = ({item, removeSatOnClick, removeSatAndConOnClick}) => {
    const handleSatClick = (item) =>{ 
        console.log("remove sat on click")
        removeSatOnClick(item)
    }

    const handleConClick = (item) => {
        console.log("remove constellation on click")
        removeSatAndConOnClick(item)
    }
// if (!item.constellation) {return <div></div>};
    // {console.log("list view elements", item)}
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
            </List.Content>                               
        </List.Item>
        );
}
 
export default ViewListElement;