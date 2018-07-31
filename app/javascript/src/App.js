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
     directions: {"distance":"2.8 km","duration":"11 mins","steps":["Head \u003cb\u003esoutheast\u003c/b\u003e on \u003cb\u003eAvenue Greene\u003c/b\u003e toward \u003cb\u003eBoulevard de Maisonneuve O\u003c/b\u003e","Turn \u003cb\u003eleft\u003c/b\u003e onto \u003cb\u003eBoulevard Dorchester\u003c/b\u003e","Continue onto \u003cb\u003eBoulevard René-Lévesque O\u003c/b\u003e","Turn \u003cb\u003eright\u003c/b\u003e onto \u003cb\u003eBoulevard Robert-Bourassa\u003c/b\u003e"],"destination":"Montreal, QC, Canada","origin":"1367 Avenue Greene, 1366 Avenue Greene, Westmount, QC H3Z 2A8, Canada","status":"OK"},
     origin: "1367 Avenue Greene, 1366 Avenue Greene, Westmount, QC H3Z 2A8, Canada",
     destination: "Montreal, QC, Canada",
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
      this.setState({directions: directions, origin: directions.origin, destination: directions.destination})

    })


    .catch(e => console.error(e))
  }

  render() {
    const {classes} = this.props
    return (
      <div className="App">
        <AppBar isDirections={!!this.state.directions} />
        <Typography className={classes.header} 
        variant='display2'  >{this.state.directions == null ? "Get a Weather Forecast For Your Next Road Trip" : "Your Directions"}</Typography>
        <Paper className={classes.main} elevation={10}>
          {this.state.directions === null && <AddressesInput origin={this.state.origin} destination= {this.state.destination} handleAddressChange={this.handleAddressChange} handleSearchClick={this.handleSearchClick}/>}
          {this.state.directions  && <DirectionsTable steps={this.state.directions.steps} distance={this.state.directions.distance}  duration={this.state.directions.duration} origin={this.state.origin} destination={this.state.destination}  />} 
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App)
