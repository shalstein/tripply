import React from 'react';
import Grid from '@material-ui/core/Grid';
import DirectionsTable from './directionsTable';
import Map from './map';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});

const tripInfo = ({directions, weather, classes}) => {
    return(
        <div className={classes.root} >
        <Grid container  >
            <Grid item xs={3}>
                    <DirectionsTable directions={directions} />
            </Grid>

            <Grid item xs={9} >
            <Map googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1mGcbKQbw2QUvp2k8UtNafT5q90cE-wwXXX&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `500px` }} />}
              containerElement={<div style={{ height: `50%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%`, width: '100%' }} />}  
              isMarkerShown={true}
            />
            </Grid >
        </Grid>
        </div>
    )
}

export default withStyles(styles)(tripInfo);
