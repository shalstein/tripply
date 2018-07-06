import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
            <TableRow>
                <TableCell className={classes.cell}>
                    Take the <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b>/<b>Pont Champlain</b> ramp to <b>Montréal</b><div>Parts of this road may be closed at certain times or days </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>

                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>

                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>


                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>


                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>



                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>

                        <TableRow>
                <TableCell className={classes.cell}>
                    Merge onto <b>Autoroute 10 O</b>/<b>Autoroute 15 N</b>/<b>Autoroute 20 O</b><div  >Continue to follow Autoroute 15 N</div>
                </TableCell>
            </TableRow>

            
        </TableBody>
      </Table>
    </Paper>
  );
}



export default withStyles(styles)(SimpleTable);
