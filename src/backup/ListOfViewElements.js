import React, { Component } from 'react'

class ListOfViewElements extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false }
    }
    render() { 

        const { view, removeSatelliteFromView, removeSatelliteWithConstellationFromView} = this.props

        return ( 
                <React.Fragment>
                    <Button
                        attached='top'
                        onClick={() => {this.setState({ modalOpen: true })}}
                    >
                        Save As
                    </Button>
                    <SaveViewModal // invisible modal
                        modalOpen={this.state.modalOpen}
                        handleClose={ () => {this.setState({ modalOpen: false })}}
                        valueIntoModal={view}
                    />
                    <Segment attached>
                        <List divided verticalAlign='middle'>
                            {view.map( item =>
                                <ViewListElement
                                    key={item.name} item={item}
                                    removeSatOnClick={removeSatelliteFromView}
                                    removeSatAndConOnClick={removeSatelliteWithConstellationFromView }
                                />
                            )}
                        </List>
                    </Segment>
                </React.Fragment>
         );
    }
}
 
export default ;






 