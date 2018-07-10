import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    //marginBottom: theme.spacing.unit * 3,

    overflowX: 'auto',
    paddingBottom: theme.spacing.unit * 3
  },
    form: {
      display: 'flex',
     justifyContent: 'center',
     flexDirection: 'column',

    },
    textField: {
      width: 500,
      margin: 'auto',
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,



    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 150,
    }
  });


  class AddressesInput extends React.Component {
      constructor(){
        super()
        this.state = {
            starting: '',
            ending: '',
            directions: [],
        }
      }



      render(){
          const {classes} = this.props

          return(
            <Paper className={classes.root} >
              <form className={classes.form} noValidate>

                <TextField
                
                label='Leaving From'
                className={classes.textField}
                margin='normal'
                />

                <TextField
                
                label="Ariving At"
                className={classes.textField}
                margin='normal'
                /> 

                <Button onClick={this.props.handleSearchClick} variant="fab" color="primary" aria-label="search" className={classes.button}>
                  <SearchIcon  >Search</SearchIcon>
                </Button>

              </form>
            </Paper>
          )
      }
  }

  export default withStyles(styles)(AddressesInput)