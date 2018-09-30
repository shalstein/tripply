import React from 'react';
import Grid from '@material-ui/core/Grid';
import DirectionsTable from './directionsTable';
import WeatherTable from './weatherTable';
import Paper from '@material-ui/core/Paper';

const tripInfo = ({directions, weather}) => {
    console.log(weather)
    return(
        <Grid container className={null} justify="center" spacing={40}>
            <Grid item>
                <Paper  elevation={10}>
                    <DirectionsTable directions={directions.directions} />
                </Paper>
            </Grid>

            <Grid item>
                <Paper  elevation={10}>
                    <WeatherTable weatherReports={weather} />
                </Paper>
            </Grid>

            
        </Grid>
    )
}

export default tripInfo