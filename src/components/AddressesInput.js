import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: theme.spacing.unit * 100,
    margin: 'auto',
    // position: 'relative', 
    // top: theme.spacing.unit * 25,


  },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 500,
    },
    menu: {
      width: 200,
    },
  });


  class AddressesInput extends React.Component {
      constructor(){
        super()
        this.state = {
            starting: '',
            ending: '',
        }
      }

      render(){
          const {classes} = this.props

          return(

            <Paper className={classes.root} elevation={10}>
              <form className={classes.container} noValidate>

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

              </form>
            </Paper>
          )
      }
  }

  export default withStyles(styles)(AddressesInput)