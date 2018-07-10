import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DirectionRow from './directionsRow'

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
  const { classes, directions } = props;

    const rows = directions.map((direction, index) => (
        <DirectionRow key={index} direction={direction} />
    ))

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>

            {rows}

            
        </TableBody>
      </Table>
    </Paper>
  );
}



export default withStyles(styles)(DirectionsTable);
