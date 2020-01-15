import React, { Component } from 'react'
import {List, Button, Icon} from 'semantic-ui-react'


const SatCard = ({item, remove}) => {

    const handleClick = (id)=>{
        console.log("clicked", id)
        remove(id)
    }

    

        return (
            <List.Item key={item.name}  >
                {item.name}
                <Button icon>
                    <Icon
                        name='plus'
                        onClick={()=>handleClick(item.id)}
                    />
                 </Button>
            </List.Item>
        );
}

 
export default SatCard;