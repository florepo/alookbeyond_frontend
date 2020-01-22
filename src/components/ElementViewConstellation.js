import React, { Component } from 'react'
import { List, Button, Icon, Header} from "semantic-ui-react";

const ElementViewConstellation = ({item,  removeConOnClick}) => {

    const handleConClick = (item) => {
        console.log("remove constellation on click")
        removeConOnClick(item)
    }



        return ( 

            <React.Fragment>
            <List.Item key={item.name}>
                <List.Content floated='right'>
                    <Button 
                        color='organe'
                        icon 
                        onClick={()=> handleConClick(item)}
                    >
                        <Icon
                            name='window close'
                           
                        />
                    </Button>
                </List.Content>
                <List.Content>
                    <Header as="h6">{item.name}</Header>
                </List.Content>               
            </List.Item>

            </React.Fragment>
          );
    }

 
export default ElementViewConstellation;