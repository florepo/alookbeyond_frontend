import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ElementViewList = ({item, removeSatOnClick, removeSatAndConOnClick}) => {
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
        <React.Fragment>
            <List.Item key={item.name}>
                <List.Content floated='right'>
                    <Button size='mini' icon >
                        <Icon
                            name='window close'
                            onClick={()=> handleSatClick(item)}
                        />
                    </Button>
                    <Button size='mini' icon
                        onClick={()=> handleConClick(item)} >
                        <Icon
                            name='bullseye'
                        />
                        <Icon
                            name='window close'
                            onClick={()=> handleConClick(item)}
                            />
                    </Button>  
                </List.Content>
                <List.Content>
                    <Header as="h6">{item.name}</Header>
                    {/* <Header as="h6">{item.constellation.name}</Header> */}
                </List.Content>               
            </List.Item>
        </React.Fragment>
        );
}
 
export default ElementViewList;