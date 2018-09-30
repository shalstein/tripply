import React from 'react';
import Table from '@material-ui/core/Table';
import WeatherRow from './weatherRow';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';

function weatherTable({weatherReports}) {
  
      const rows = weatherReports.map((report, index) => (
          <WeatherRow key={index} report={report} />
      ))
  
  
    return (
      <Paper >
        <Table>
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  export default weatherTable
  