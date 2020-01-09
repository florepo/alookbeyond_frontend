import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'


const SatCard = ({info, removeHandler}) => {

    const handleClick = (id)=>{
        console.log("clicked", id)
        removeHandler(id)
    }
    

        return (
            <Card>
                {info.name}
                <Button
                    onClick={()=>handleClick(info.id)}
                >
                    Remove
                </Button>
            </Card>
        );
}

 
export default SatCard;