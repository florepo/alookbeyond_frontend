import React,{ Component } from 'react'
import {Container, Grid} from 'semantic-ui-react'

import SideContainer from './SideContainer'
import ThreeDisplay from './Viewport'
import SelectionContainer from './SelectionContainer'


const MainDisplay = ({fetchedSats, addSat,removeSat, mySats}) => {

    return ( 
        <Container className="MainDisplay">
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <SideContainer
                            className="SideContainer"
                            sats={fetchedSats}
                            addSat={addSat}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <ThreeDisplay
                            className="ThreeDisplay"
                            sats={mySats}
                        />
                    </Grid.Column>
                </ Grid.Row>
                <Grid.Row>
                    <SelectionContainer
                        className="SelectionContainer"
                        sats={mySats}
                        removeSat={removeSat}
                    />
                </Grid.Row>
                </Grid>
        </Container>
    );
}

export default MainDisplay;