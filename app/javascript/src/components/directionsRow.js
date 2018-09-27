import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Direction from './direction';
import Weather from './weather';

const styles = theme => ({

     cell: {
        padding: theme.spacing.unit * 4,
        borderRight: '1px solid rgb(224, 224, 224)',
     },
     weather: {
        minWidth: '10em',
        borderTop: '1px solid blue' ,
        borderBottom: 'none',

    }
  });

const DirectionsRow = props => {
    const { classes, direction } = props
    return(
    <TableRow>
        <TableCell scope='row' component='th'  className={classes.cell} >
          <Direction html_instructions={{__html: direction.html_instructions}} />
          {direction.weather && <Weather weatherData={direction.weather} /> }

        </TableCell>
        
     </TableRow>
)}

export default withStyles(styles)(DirectionsRow);
