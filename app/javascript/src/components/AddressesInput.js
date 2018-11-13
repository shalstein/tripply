import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

const styles = theme => ({
  root: {
    width: '33%',
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // padding: theme.spacing.unit *2,

  },
  textField: {
    width: '100%',
    margin: 'auto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  button: {
    margin: theme.spacing.unit,
  }
  });


  class AddressesInput extends React.Component {


      render(){
          const {classes} = this.props
          return(
            <Paper className={classes.root} elevation={10} >
              <form className={classes.form} noValidate>
                <input type='hidden' name="authenticity_token" />
                <TextField
                
                label='Leaving From'
                name='origin'
                className={classes.textField}

                margin='normal'
                value={this.props.origin}
                onChange={this.props.handleAddressChange}
                />


                <TextField
                name='destination'
                label="Ariving At"
                className={classes.textField}
                margin='normal'
                value={this.props.destination}
                onChange={this.props.handleAddressChange}
                /> 

                <Button variant="contained" onClick={this.props.handleSearchClick}  color="primary" aria-label="search" className={classes.button}>GET TRIPCAST</Button>

              </form>
            </Paper>
          )
      }
  }

  export default withStyles(styles)(AddressesInput)

  // //{
  //   width: '100%',
  //   marginTop: theme.spacing.unit * 3,
  //   overflowX: 'auto',
  //   paddingBottom: theme.spacing.unit * 3
  // }