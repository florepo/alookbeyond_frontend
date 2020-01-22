import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

class ButtonLoadWatchList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleClick = () => {
        console.log("click")
        this.props.onClick(this.props.id)
    }

    render() { 
        return (  <Button
            color='organe'
            loated='right'
            onClick={this.handleClick}
        > 
        load 
        </Button> );
    }
}
 
export default ButtonLoadWatchList;
