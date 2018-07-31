import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1,

  },
  flex: {
    flexGrow: 1,
  }
};

function appBar(props) {
  const { classes, isDirections } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography className= {classes.flex} variant="headline" color="primary">
            Tripply
          </Typography>
         { isDirections && <Button  color='inherit'>New Search</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default withStyles(styles)(appBar);