import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    width: '31%',
    margin: 'auto',
    padding: theme.spacing.unit * 2,
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textField: {
    width: '100%',
    margin: 'auto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  progress: {
    position: 'absolute',
    top: '0.4em',
    left: '3.5em',
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
                error={!this.props.addressInputs.origin.isValid}
                label='Leaving From'
                onKeyDown={this.props.handleInputKeydown}
                name='origin'
                className={classes.textField}

                margin='normal'
                value={this.props.addressInputs.origin.value}
                onChange={this.props.handleAddressChange}
                />


                <TextField
                name='destination'
                label="Arriving To"
                className={classes.textField}
                margin='normal'
                onKeyDown={this.props.handleInputKeydown}
                value={this.props.addressInputs.destination.value}
                onChange={this.props.handleAddressChange}
                error={!this.props.addressInputs.destination.isValid}

                /> 

                <div name='fetch-wrapper' style={{position: 'relative'}}>
                  <Button disabled={this.props.loading} variant="contained" onClick={this.props.handleSearchClick}  color="primary" aria-label="search" className={classes.button}>GET TRIPCAST</Button>
                {this.props.loading && <CircularProgress size={24} className={classes.progress} />}
                </div>
              </form>
            </Paper>
          )
      }
  }

  export default withStyles(styles)(AddressesInput)
