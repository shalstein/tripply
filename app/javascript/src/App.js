import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import AddressesInput from './components/AddressesInput'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TripInfo from './components/tripInfo';
import DevResponse from './responseDevV10.3'
import { resolve } from 'upath';

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
   this.dummyData = DevResponse;
   this.state = {
    directions: null ,
    mapData: {polylines:[], bounds: {} },
     origin: '',
     destination: '',
     weather: {},
     isLoading: false,
   }
  }




  // constructor(){
  //   super()
  //   this.dummyData = DevResponse;
  //   this.state = {
  //    directions: this.dummyData.directions ,
  //    mapData: this.dummyData.mapData,
  //     origin: '',
  //     destination: '',
  //     weather: this.dummyData.weather_conditions,
  //   }
  //  }

  handleAddressChange = (event, t) => {
    this.setState({[event.target.name]: event.target.value})
  }

  updateIsloading = () => { 
    setTimeout(() =>  this.setState({isLoading: !this.state.isLoading}),2000)

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
    this.updateIsloading()
    if (this.validateAddressInputs()){
      console.log('valdiae')
    fetch(`/api/directions/?origin=${this.state.origin}&destination=${this.state.destination}`)
    .then(response => response.json())
    .then(tripData => { 
      if (tripData.directions_status !== 'OK'){
        throw new Error(`API status: ${tripData.directions_status}`)
      }
       this.setState({directions: tripData.directions, weather: tripData.weather_conditions, mapData: tripData.mapData}, () => console.log('update state', this.state))
    })
    .catch(e => console.error(e))
    }
    debugger
    this.updateIsloading()
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