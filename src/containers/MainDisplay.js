import React,{ Component } from 'react'
import BoxTest from '../components/BoxTest'
import ThreeDisplay from './ThreeDisplay'
import SideContainer from './SideContainer'
import {Container, Grid} from 'semantic-ui-react'


const MainDisplay = ({mySats, addSat}) => {
    console.log('maindisplay',mySats)

    return ( 
        <div className="MainDisplay">
            <Container className="MainDisplay">
                <Grid columns={2}>
                    <Grid.Column width={6}>
                        <SideContainer
                            className="SideContainer"
                            sats={mySats}
                            addSat={addSat}
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <ThreeDisplay
                            className="ThreeDisplay"
                            sats={mySats}
                        />
                    </Grid.Column>
                </Grid>

            </Container>


        </div>
        );
}

 
export default MainDisplay;