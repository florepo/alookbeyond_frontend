import React, { Component } from 'react'
import {Dropdown} from 'semantic-ui-react'
import ButtonLoadWatchList from '../components/ButtonLoadWatchList'

class DropdownWatchlists extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleLoadClick = (id) => {
        console.log("click", id)
        this.props.onClick(id)
    }

    render() { 
        return ( 
            <Dropdown item text='Watchlists'>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Alpha 
                            <ButtonLoadWatchList 
                                id={1}
                                onClick={this.handleLoadClick} />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleClick}>
                            Bravo
                            <ButtonLoadWatchList 
                                id={2}
                                onClick={this.handleLoadClick} />
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleClick}>
                            Charlie
                            <ButtonLoadWatchList 
                                id={3}
                                onClick={this.handleLoadClick} />
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Delta
                            <ButtonLoadWatchList 
                                id={4}
                                onClick={this.handleLoadClick} />
                        </Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>

         );
    }
}
 
export default DropdownWatchlists;
            