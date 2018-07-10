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
     directions: []
   }
  }

  handleSearchClick = (event, t) => {
    fetch('/api/directions')
    .then(directions => directions.json())
    
    .then(directions => this.setState({directions: directions}, (e) => console.log(this.state.directions))
    )
    .catch(e => console.error(e))
  }

  render() {
    const {classes} = this.props
    return (
      <div className="App">
        <AppBar/>
        <Typography className={classes.header} 
        variant='display2'  >Get a Weather Forecast For Your Next Road Trip</Typography>
        <Paper className={classes.main} elevation={10}>
          <AddressesInput handleSearchClick={this.handleSearchClick} />
          {this.state.directions.length > 0 && <DirectionsTable directions={this.state.directions} />} 
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App)
