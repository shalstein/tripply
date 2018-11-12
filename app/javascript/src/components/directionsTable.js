import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DirectionRow from './directionsRow'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  table: {
    backgroundColor: '#ededee',
    height: '100%',
    overflow: 'scroll',
  },
  cell: {
    padding: theme.spacing.unit * 3, 
  }
});


function DirectionsTable({classes, directions, weather}) {
  const {origin, destination, duration, distance, steps,} = directions;


    const rows = steps.map((direction, index) => (
        <DirectionRow key={index} direction={direction} />
    ))
    const reports = Object.keys(weather).map( (condition, index) => (
      <li key={index} >{condition} for {weather[condition]}km</li>
    ))


  return (
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

          <TableRow>
            <TableCell className={classes.cell}>
              <Typography variant='title' >Trip Forecast</Typography>
              <ul>
                {reports}
              </ul>
            </TableCell>
          </TableRow>
          
          <TableCell>
            <Typography variant='title' >Directions</Typography>
          </TableCell>
          
          {rows}
            
        </TableBody>
      </Table>
  );
}



export default withStyles(styles)(DirectionsTable);
