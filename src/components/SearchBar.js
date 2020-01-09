import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { input: ''}
    }

    handleInputChange=(event)=>{
        console.log("input change")
        this.setState({input: event.target.value})
    }

    handleSubmit= (event)=>{
        event.preventDefault()
        console.log("submit",this.state.input)
        this.props.handleSearch(this.state.input)
    }

    render() { 
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="enter search term"
                    name="searchTerm"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                />
                <button type="submit">submit</button>
 
            </form>
         );
    }
}
