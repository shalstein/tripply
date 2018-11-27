import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import AddressesInput from './components/AddressesInput'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TripInfo from './components/tripInfo';
import { rejects } from 'assert';

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
    addressInputs: {origin: {value: '', isValid: true }, destination: {value: '', isValid: true}},
    weather: {},
    isLoading: false,
   }
  }

  handleAddressChange = (event) => {
    const newValue = {}
    newValue[event.target.name] = {value: event.target.value, isValid: true} 
    this.setState( (state) => ({addressInputs: {...state.addressInputs, ...newValue}}))
  }

  updateIsloading = () => { 
    this.setState(previousState => ({isLoading: !previousState.isLoading}))
  }

  validateAddressInputs = () => {

    let validFlag = true;
    const newAddressInputs = {};
    const addressInputsKeys = Object.keys(this.state.addressInputs);
    addressInputsKeys.forEach( input => {
      if (this.state.addressInputs[input].value.trim() === '') {
        newAddressInputs[input] = {value: '', isValid: false} 
        validFlag = false
      }
    })
    
    if(!validFlag){
      this.setState( (state) => ({addressInputs: {...state.addressInputs, ...newAddressInputs}}))
    }
    return validFlag
  }

  handleSearchClick = (event, t) => {
    if (this.validateAddressInputs()) {
      this.updateIsloading();

      fetch(`/api/directions/?origin=${this.state.addressInputs.origin.value}&destination=${this.state.addressInputs.destination.value}`)
      .then(response => response.json())
      .then(tripData => { 
        if (tripData.directions_status !== 'OK'){
        }
         this.setState({directions: tripData.directions, weather: tripData.weather_conditions, mapData: tripData.mapData})
      })
      .catch(e => console.error(e))
      .finally(() => {
        this.updateIsloading()
      })
    }
  }

  handleNewSearchClick = event => {
    this.setState({directions: null, addressInputs: {origin: {value: '', isValid: true }, destination: {value: '', isValid: true}}},
    )
  }

  render() {
    const {classes} = this.props
    let currentComponent = <AddressesInput loading={this.state.isLoading} addressInputs={this.state.addressInputs} handleAddressChange={this.handleAddressChange} handleSearchClick={this.handleSearchClick}/>

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