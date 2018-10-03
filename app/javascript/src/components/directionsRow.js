import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

     cell: {
        padding: theme.spacing.unit * 4,
     },
  });

const DirectionsRow = props => {
  const { classes, direction } = props


    return(
    <TableRow>
        <TableCell scope='row' dangerouslySetInnerHTML={{__html: direction.html_instructions}} component='th'  className={classes.cell} />        
     </TableRow>
)}

export default withStyles(styles)(DirectionsRow);
