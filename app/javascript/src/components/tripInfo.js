import React from 'react';
import Grid from '@material-ui/core/Grid';
import DirectionsTable from './directionsTable';
import Map from './map';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,

    },
    mapItem: {
     
    },
    table: {
        overflow: 'scroll',
        height: '100vh',
    }
});

const tripInfo = ({directions, weather, classes, mapData}) => {
    
    return(
        <div className={classes.root} >
        <Grid container  >
            <Grid className={classes.table} item xs={3}>
                    <DirectionsTable directions={directions} weather={weather} />
            </Grid>

            <Grid item xs={9} className={classes.mapItem} >
                <Map googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCr0PBZR-dOJOGakNQALNjjsH8ZXCEOAHY&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `500px` }} />}
                containerElement={<div style={{ height: '75vh', width: '100%' }} />}
                mapElement={<div style={{ height: '85vh', width: '100%' }} />}  
                mapData={mapData}
                weather={weather}
                />
            </Grid >
        </Grid>
        </div>
    )
}

export default withStyles(styles)(tripInfo);
