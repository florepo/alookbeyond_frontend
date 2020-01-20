import React, {Component} from 'react';
import {Tab, List, Button, Segment} from 'semantic-ui-react'

import ElementViewList from '../components/ElementViewList'

class ListOfViewElements extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const {view} = this.props
        return (

            <React.Fragment>
            {/* <Button
                attached='top'
                onClick={() => {this.setState({ modalOpen: true })}}
            >
                Save As
            </Button>
            <SaveViewModal // invisible modal
                modalOpen={this.state.modalOpen}
                handleClose={ () => {this.setState({ modalOpen: false })}}
                valueIntoModal={this.state.view}
            /> */}
            <Segment attached>
                <List divided verticalAlign='middle'>
                    {view.map( item =>
                        <ElementViewList
                            key={item.name} item={item}
                            removeSatOnClick={this.props.removeSatOnClick}
                            removeSatAndConOnClick={this.props.removeSatAndConOnClick}
                        />
                    )}
                </List>
            </Segment>
        </React.Fragment>
          );
    }
}
 
export default ListOfViewElements;