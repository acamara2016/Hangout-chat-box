import React from 'react';

export default class MenuItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username : "",
            picture : ""
        }
        
    }
    render(){
        return(
            <a style={{marginTop:'20px'}} class="btn btn-primary" onClick={signInWithGoogle} role="button">{p}</a>
        )
    }
}