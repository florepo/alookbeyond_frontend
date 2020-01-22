import React from 'react'
import {List, Button, Icon, Header} from 'semantic-ui-react'

const ElementWatchlist = ({item, loadWatchlistInView, switchToSecondTab}) => {


    const handleButtonClick = (item) => {
        console.log("handle button click")
        loadWatchlistInView(item)
        switchToSecondTab()
    }
// if (!item.constellation) {return <div></div>};
    {console.log("list view elements", item.satellites.length)}
    return ( 
        <React.Fragment>
            <List.Item key={item.name}>
                <List.Content floated='right'>
                    <Button size='mini' icon  onClick={()=> handleButtonClick(item)} >
                    LOAD
                    </Button>
                </List.Content>
                <List.Content>
                    <Header as="h6">{item.name}</Header>
                    {(item.satellites.length>0)
                    ? 
                    <div>
                    Satellites tracked: {item.satellites.length}
                    </div>
                    :
                    "empty"
                    }
                </List.Content>                               
            </List.Item>
        </React.Fragment>
        );
}
 
export default ElementWatchlist;