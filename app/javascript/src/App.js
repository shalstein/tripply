import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import AddressesInput from './components/AddressesInput'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TripInfo from './components/tripInfo';

const styles = theme => ({

  header: {
    margin: theme.spacing.unit * 2.5,
    textAlign: 'center',
    padding: theme.spacing.unit * 5


  },
  main: {
    width: '100%',
  },
    app: {
      height: '100%',
    },
  }
)


class App extends Component {
  
  constructor(){
   super()
   this.state = {
    directions: null ,
    mapData: {polylines:[], bounds: {} },
     origin: '',
     destination: '',
     weather: {},
     isLoading: false,
   }
  }

  handleAddressChange = (event, t) => {
    this.setState({[event.target.name]: event.target.value})
  }

  updateIsloading = () => { 
    this.setState(previousState => ({isLoading: !previousState.isLoading}))
  }

  validateAddressInputs = () => {
    if(this.state.destination.trim() === '' || this.state.origin.trim() === ''){
      console.log('fasle valdiadt')
      return false
    }
    console.log('rtrue validate')
    return true
  }

  handleSearchClick = (event, t) => {
    
    this.updateIsloading();
    new Promise((resolve, reject) => {
      if (this.validateAddressInputs()) {
         resolve()
      }
       reject('Cannot search empty addresses')
    })
    .then(() => {
      return fetch(`/api/directions/?origin=${this.state.origin}&destination=${this.state.destination}`)
    })    
    .then(response => response.json())
    .then(tripData => { 
      if (tripData.directions_status !== 'OK'){
        throw new Error(`API status: ${tripData.directions_status}`)
      }
       this.setState({directions: tripData.directions, weather: tripData.weather_conditions, mapData: tripData.mapData})
    })
    .catch(e => console.error(e))
    .finally(() => {
      this.updateIsloading()
    })
    
  }

  handleNewSearchClick = event => {
    this.setState({directions: null, origin: '', destination: ''})
  }

  render() {
    const {classes} = this.props
    let currentComponent = <AddressesInput loading={this.state.isLoading} origin={this.state.origin} destination= {this.state.destination} handleAddressChange={this.handleAddressChange} handleSearchClick={this.handleSearchClick}/>

    if (this.state.directions) {
       currentComponent = <TripInfo directions={this.state.directions} mapData={this.state.mapData} weather={this.state.weather}   />
    }


    return (
      <div className={classes.app}>
        <AppBar isDirections={!!this.state.directions} handleNewSearchClick={this.handleNewSearchClick} />
        {this.state.directions === null && <Typography className={classes.header} 
        variant='display2' >Get a Weather Forecast For Your Next Road Trip</Typography>}

          {currentComponent}
             
      </div>
    );
  }
}

export default withStyles(styles)(App)