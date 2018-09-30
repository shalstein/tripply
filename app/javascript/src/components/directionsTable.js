import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
// import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

import Paper from '@material-ui/core/Paper';
import DirectionRow from './directionsRow'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflow: 'hidden',

  },
  table: {
    minWidth: 700,
  },
  cell: {
   padding: theme.spacing.unit * 3
  }
});


function DirectionsTable({classes, directions}) {
  console.log(directions)
  const {origin, destination, duration, distance, steps,} = directions;


    const rows = steps.map((direction, index) => (
        <DirectionRow key={index} direction={direction} />
    ))


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell}>
              Leaving From: <Typography variant='title' > {origin} </Typography> <br />
              Ariving To: <Typography variant='title' >{destination} </Typography> <br />

              <Typography >Distance: {distance} </Typography>
              <Typography >Duration: {duration} </Typography>
            </TableCell>
          </TableRow>
          
          {rows}

            
        </TableBody>
      </Table>
    </Paper>
  );
}



export default withStyles(styles)(DirectionsTable);
