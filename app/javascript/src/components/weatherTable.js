import React from 'react';
import Table from '@material-ui/core/Table';
import WeatherRow from './weatherRow';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
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
})




function weatherTable({weatherReports, classes}) {
  
      const rows = weatherReports.map((report, index) => (
          <WeatherRow key={index} report={report} />
      ))
  
  
    return (
      <Paper className={classes.root} >
        <Table>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  export default withStyles(style)(weatherTable);