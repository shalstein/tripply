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
     directions: [1,2]
   }
  }
  render() {
    const {classes} = this.props
    return (
      <div className="App">
        <AppBar/>
        <Typography className={classes.header} 
        variant='display2'  >Get a Weather Forecast For Your Next Road Trip</Typography>
        <Paper className={classes.main} elevation={10}>
        <AddressesInput />
        {this.state.directions && <DirectionsTable />} 
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App)
