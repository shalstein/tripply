import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    cell: {
      padding: theme.spacing.unit * 5
    }
  });

const DirectionsRow = props => {
    const { classes, direction } = props
    return(
    <TableRow>
        <TableCell dangerouslySetInnerHTML={{__html: direction}} className={classes.cell} />
     </TableRow>
)}

export default withStyles(styles)(DirectionsRow);
