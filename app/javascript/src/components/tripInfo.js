import React from 'react';
import Grid from '@material-ui/core/Grid';
import DirectionsTable from './directionsTable';
import Map from './map';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    width: '25%',
});

const tripInfo = ({directions, weather}) => {
    return(
        <Grid container  >
            <Grid item>
                    <DirectionsTable directions={directions} />
            </Grid>
            <Map googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1mGcbKQbw2QUvp2k8UtNafT5q90cE-ww&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `500px` }} />}
              containerElement={<div style={{ height: `400px`, width: '400px' }} />}
              mapElement={<div style={{ height: `500px` }} />}  
              isMarkerShown={true}
            />
        </Grid>
    )
}

export default withStyles(styles)(tripInfo);
