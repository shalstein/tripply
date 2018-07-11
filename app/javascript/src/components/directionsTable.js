import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DirectionRow from './directionsRow'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  cell: {
    padding: theme.spacing.unit * 5
  }
});


function DirectionsTable(props) {
  const { classes, steps, duration, distance } = props;

    const rows = steps.map((direction, index) => (
        <DirectionRow key={index} direction={direction} />
    ))


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.cell}>
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
