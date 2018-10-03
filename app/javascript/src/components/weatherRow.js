import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
const styles = theme => ({
    container: {

        paddingBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 4,
    },

    cell: {
        padding: theme.spacing.unit * 4,
     },


    header: {
        fontSize: '150%',
    }


})


const weather = ({report, classes}) => {
    const { weather, temp, visibility} = report;
    
    return (
        <TableRow className={classes.container} >
            <TableCell className={classes.cell}>
                <p className={classes.header} >Weather</p>
                <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
                <div>{weather.description}</div>
                <div>Temparture: {temp} ℃ </div>
                <div>Visibility: {visibility}</div>
            </TableCell>
        </TableRow>
    )
}

export default withStyles(styles)(weather);