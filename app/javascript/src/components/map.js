import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import { Polyline } from "react-google-maps";
import MapControl from './mapControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    mapControlHeader: {
      fontSize: '1.5em', 
      fontWeight: 'bold', 
      paddingBottom: '0.5em',
    },
    mapControlRoot: {
      margin: '0.7em', 
      padding: '0.5em',
      backgroundColor: 'whitesmoke',
      fontSize: '1.2em'
    },
    mapControlItem: {
      fontSize: '1.2em'
    }
});

 const MyMapComponent = withScriptjs(withGoogleMap((props) => {

      const polyines = props.mapData.polylines.map(((polyline, index) => <Polyline
      path={google.maps.geometry.encoding.decodePath(polyline.points)} options={{strokeColor: polyline.color, strokeOpacity: 0.8, geodesic: true, strokeWeight: 6 }} key={index} /> ))


      const mapRef = mapElement => { 
        const {southwest, northeast} = props.mapData.bounds
        const bounds = new google.maps.LatLngBounds(southwest, northeast)
        mapElement && mapElement.fitBounds(bounds)
      }

        return (<GoogleMap
          ref={mapRef}
          defaultZoom={8}
          defaultOptions={{gestureHandling: 'greedy', mapTypeControl: false, streetViewControl: false, fullscreenControlOptions: {position: google.maps.ControlPosition.TOP_LEFT } }}
          

        >
          <MapControl position={google.maps.ControlPosition.TOP_RIGHT}>
            <div className={props.classes.mapControlRoot} >
            <div className={props.classes.mapControlHeader} >Legend</div>
            <div >Clear<hr style={{border: 'solid #40a601'}} /></div>
            <div>Drizzle<hr style={{border: 'solid #016b91'}} /></div>
            <div>Rain<hr style={{border: 'solid #140191'}} /></div>
            <div>Snow<hr style={{border: 'solid #912f01'}} /></div>
            <div>Thunderstorm<hr style={{border: 'solid #910136'}} /></div>
            </div>
          </MapControl>        
          <Marker position={props.mapData.end_location} />
          <Marker position={props.mapData.start_location} defaultIcon={{path: google.maps.SymbolPath.CIRCLE, scale: 5}} />

          {polyines}

        </GoogleMap>)
      }

    ))
  
 


export default withStyles(styles)(MyMapComponent);