import React, {Component} from 'react'
import {List, Button, Icon} from 'semantic-ui-react'
import SelectionNavInfo from '../components/SelectionNavInfo.js'


class SelectionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleClick = (id) =>{
        console.log("clicked")
    }
    render() { 
        const {info} = this.props

        return ( 
            <div
            className="info-box"
            >
                {(info.length==0)?
                <div>
                    <SelectionNavInfo />
                </div>
                :
                <div >
                    <h4>{info[0].name}</h4>
                    <p>{info[0].description}</p>
                </div>
                }
            </div> );
    }
}
 
export default SelectionContainer;
