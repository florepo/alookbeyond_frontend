import React, { Component } from 'react';
import {Button, CardMetaProps, Card} from 'semantic-ui-react'

const SideContainer = ({sats}) => {

    const handleClick=()=>{
        console.log("clicked")
    }

    console.log(sats)
    return ( 
        <div className="SideContainer"> 
            <Card.Group>
                {sats.map(sat=>{
                    return (
                        <Card fluid teal="white" key={sat.id}>
                            {sat.name}
                            <Button onClick={handleClick} id={sat.id}>
                                ADD
                            </Button>
                        </Card>
                    )
                })}
            </Card.Group>
        </div>
    );
}

export default SideContainer;