import React,{ Component } from 'react'
import BoxTest from './BoxTest'
import ThreeDisplay from './ThreeDisplay'
import SideContainer from './SideContainer'
import {Container, Grid} from 'semantic-ui-react'


const MainDisplay = ({sats}) => {
    console.log('maindisplay',sats)




    return ( 
        <div className="MainDisplay">
            <Container className="MainDisplay">
                <Grid columns={2}>
                    <Grid.Column width={6}>
                                 <SideContainer sats={sats} />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <ThreeDisplay className="ThreeDisplay"/>
                    </Grid.Column>
                </Grid>

            </Container>


        </div>
        );
}

 
export default MainDisplay;