import React from 'react'
import NavBar from '../containers/NavBar'
import MainDisplay from '../containers/MainDisplay'

const MainPage = () => {

    return (
        <div className = "main-page" >
            <NavBar className = "navbar" />
            <MainDisplay className = "main-display" />
        </div>
    )
    
}
 
export default MainPage;