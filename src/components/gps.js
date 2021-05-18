import React from 'react';
export default class GPS extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lat: null,
        lng: null,
      }
    }
    componentWillMount() {
  
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
      }, err => console.log(err)
      );
    }
  
    render() {
  
      return (
        <div >
          <h1>Current Position:</h1>
          <p>Latitude: {this.state.lat}</p>
          <p>Longitude: {this.state.lng}</p>
        </div>
      );
    }
  }