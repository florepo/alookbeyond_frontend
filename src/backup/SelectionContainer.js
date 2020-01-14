import React from 'react'
import {List, Button, Icon} from 'semantic-ui-react'

const SelectionContainer =({sats, remove})=> {

    const handleClick = (id) =>{
        console.log("clicked")
        remove(id)
    }

    return ( 
        <div className="selectionContainer">
            <List selection verticalAlign='middle'>
                {sats.map(sat => {
                    return  <List.Item key={sat.name} >
                                {sat.name}
                                <Button icon onClick={()=>handleClick(sat.id)}>
                                    <Icon name='minus'/>
                                </Button>
                            </List.Item>
                })}
            </List>
        </div>
    );

}
 
export default SelectionContainer;