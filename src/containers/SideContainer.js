import React, { Component } from 'react';
import {Button, CardMetaProps, Card} from 'semantic-ui-react'

const SideContainer = ({sats,addSat}) => {

    const handleClick=(id)=>{
        addSat(id)
    }

    return ( 
        <div className="SideContainer"> 
            <Card.Group>
                {sats.map(sat=>{
                    return (
                        <Card fluid teal="white" key={sat.id}>
                            {sat.name}
                            <Button 
                                onClick={()=>handleClick(sat.id)} 
                                id={sat.id}
                            >
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