import React from 'react';
import Grid from '@material-ui/core/Grid';
import DirectionsTable from './directionsTable';
import WeatherTable from './weatherTable';

const tripInfo = ({directions, weather}) => {
    
    return(
        <Grid container className={null} justify="center" spacing={40}>
            <Grid item>
                <Paper className={classes.main} elevation={10}>
                    <DirectionsTable directions={directions} />
                </Paper>
            </Grid>

            <Grid item>
                <Paper className={classes.main} elevation={10}>
                    <WeatherTable weather={weather} />
                </Paper>
            </Grid>

            
        </Grid>
    )
}

export default tripInfo