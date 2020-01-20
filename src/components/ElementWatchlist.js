import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ElementWatchlist = ({item, loadWatchlistInView}) => {


    const handleButtonClick = (item) => {
        console.log("handle button click")
        loadWatchlistInView(item)
    }
// if (!item.constellation) {return <div></div>};
    // {console.log("list view elements", item)}
    return ( 
        <React.Fragment>
            <List.Item key={item.name}>
                <List.Content floated='right'>
                    <Button size='mini' icon >
                        <Icon onClick={()=> handleButtonClick(item)}> 
                            LOAD
                        </Icon>
                    </Button>
                </List.Content>
                <List.Content>
                    <Header as="h6">{item.name}</Header>
                </List.Content>                               
            </List.Item>
        </React.Fragment>
        );
}
 
export default ElementWatchlist;