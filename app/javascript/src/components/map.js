import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import { Polyline } from "react-google-maps";


 const MyMapComponent = withScriptjs(withGoogleMap((props) => {
      const polyines = props.mapData.polylines.map(((polyline, index) => <Polyline
      path={google.maps.geometry.encoding.decodePath(polyline)} options={{strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2, geodesic: true, }} key={index} /> ))

      const mapRef = mapElement => { 
        const {southwest, northeast} = props.mapData.bounds
        const bounds = new google.maps.LatLngBounds(southwest, northeast)
        mapElement && mapElement.fitBounds(bounds)
      }

        return (<GoogleMap
          ref={mapRef}
        >
          {polyines}

        </GoogleMap>)
      }

    ))
  
 


export default MyMapComponent;