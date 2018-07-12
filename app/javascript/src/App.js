import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import AddressesInput from './components/AddressesInput'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DirectionsTable from './components/directionsTable';
import Paper from '@material-ui/core/Paper'

const styles = theme => ({

  header: {
    margin: theme.spacing.unit * 2.5,
    textAlign: 'center',
    padding: theme.spacing.unit * 5


  },
  main: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: theme.spacing.unit * 100,
    margin: 'auto',
    marginBottom: theme.spacing.unit * 3,
  },

})


class App extends Component {
  constructor(){
   super()
   this.state = {
     directions: null,
     origin: '',
     destination: ''
   }
  }

  handleAddressChange = (event, t) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSearchClick = (event, t) => {

    fetch(`/api/directions/?origin=${this.state.origin}&destination=${this.state.destination}`)
    .then(directions => directions.json())
    
    .then(directions => { 
      if (directions.error_message){
        throw new Error(directions.error_message)
      }
      return this.setState({directions: directions}, (e) => console.log(this.state.directions))
    })


    .catch(e => console.error(e))
  }

  render() {
    console.log(this.state)
    const {classes} = this.props
    return (
      <div className="App">
        <AppBar/>
        <Typography className={classes.header} 
        variant='display2'  >Get a Weather Forecast For Your Next Road Trip</Typography>
        <Paper className={classes.main} elevation={10}>
          <AddressesInput handleAddressChange={this.handleAddressChange} handleSearchClick={this.handleSearchClick}/>
          {this.state.directions  && <DirectionsTable steps={this.state.directions.steps} distance={this.state.directions.distance}  duration={this.state.directions.duration} origin={this.state.origin} destination={this.state.destination}  />} 
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App)
