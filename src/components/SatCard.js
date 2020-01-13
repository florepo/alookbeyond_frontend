import React, { Component } from 'react'
import {Card, Button} from 'semantic-ui-react'


const SatCard = ({info, remove}) => {

    const handleClick = (id)=>{
        console.log("clicked", id)
        remove(id)
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