import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'
import AddressesInput from './components/AddressesInput'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DirectionsTable from './components/directionsTable';
import Paper from '@material-ui/core/Paper'
import responseDev from './responseDev'
import Grid from '@material-ui/core/Grid';


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
     directions: responseDev ,
     origin: 'Orange CT',
     destination: '07960',
   }
  }

  handleAddressChange = (event, t) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSearchClick = (event, t) => {

    fetch(`/api/directions/?origin=${this.state.origin}&destination=${this.state.destination}`)
    .then(directions => directions.json())
    
    .then(directions => { 
      if (directions.status !== 'OK'){
        throw new Error(`API status: ${directions.status}`)
      }
      this.setState({directions: directions, origin: directions.origin, destination: directions.destination}, () => console.log(this.state))

    })


    .catch(e => console.error(e))
  }

  handleNewSearchClick = event => {
    this.setState({directions: null, origin: '', destination: ''})
  }

  render() {
    const {classes} = this.props

    let currentComponent = <AddressesInput origin={this.state.origin} destination= {this.state.destination} handleAddressChange={this.handleAddressChange} handleSearchClick={this.handleSearchClick}/>

    if (this.state.directions) {
       currentComponent = <DirectionsTable steps={this.state.directions.steps} distance={this.state.directions.distance}  duration={this.state.directions.duration} origin={this.state.directions.origin} destination={this.state.directions.destination}  />
    }


    return (
      <div className="App">
        <AppBar isDirections={!!this.state.directions} handleNewSearchClick={this.handleNewSearchClick} />
        <Typography className={classes.header} 
        variant='display2'  >{this.state.directions == null ? "Get a Weather Forecast For Your Next Road Trip" : "Your Directions"}</Typography>

            <Grid container className={null} justify="center" spacing={40}>
              <Grid item>
                <Paper className={classes.main} elevation={10}>
                    {currentComponent}
                </Paper>
              </Grid>
            </Grid>




      </div>
    );
  }
}

export default withStyles(styles)(App)