import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    container: {
        borderTop: '0.1em solid blue',
        borderBottom: '0.1em solid blue',
        paddingBottom: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 4,
    },

    header: {
        fontSize: '150%',
    }


})


const weather = ({weatherReport}) => {
    const { weather, temp, visibility} = weatherReport;
    
    return (
        <TableRow className={classes.container} >
            <h4 className={classes.header} >Weather</h4>
            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
            <div>{weather.description}</div>
            <div>Temparture: {temp} ℃ </div>
            <div>Visibility: {visibility}</div>
        </TableRow>
    )
}

export default withStyles(styles)(weather);