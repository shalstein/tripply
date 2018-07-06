import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'

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

              </form>
            </Paper>
          )
      }
  }

  export default withStyles(styles)(AddressesInput)