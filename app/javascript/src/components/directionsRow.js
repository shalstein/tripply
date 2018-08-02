import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

     cell: {
        padding: theme.spacing.unit * 4,
        borderRight: '1px solid rgb(224, 224, 224)',
     },
     weatherCell: {
        minWidth: '10em',
        borderTop: '1px solid rgb(224, 224, 224)',
        borderBottom: 'none',
    }
  });

const DirectionsRow = props => {
    const { classes, direction } = props
    return(
    <TableRow>
        <TableCell scope='row' component='th' dangerouslySetInnerHTML={{__html: direction.html_instructions}} className={classes.cell} />
        
        {direction.weather && <TableCell className={classes.weatherCell} >
          <img src={`http://openweathermap.org/img/w/${direction.weather.weather.icon}.png`} />
          <div>{direction.weather.weather.description}</div>
          <div>Temparture: {direction.weather.temp} ℃ </div>
          <div>Visibility: {direction.weather.visibility}</div>
        </TableCell>}
     </TableRow>
)}

export default withStyles(styles)(DirectionsRow);
