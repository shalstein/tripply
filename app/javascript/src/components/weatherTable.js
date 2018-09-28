import React from 'react';
import Table from '@material-ui/core/Table';
import WeatherRow from './weatherRow';

function DirectionsTable({weatherReports}) {
  
      const rows = weatherReports.map((report, index) => (
          <WeatherRow key={index} report={report} />
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
  