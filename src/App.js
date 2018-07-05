import React, { Component } from 'react';
import './App.css';
import AppBar from './components/AppBar'



const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar/>
      </div>
    );
  }
}

export default App
