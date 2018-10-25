import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import { Polyline } from "react-google-maps";


const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  return (<GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
     <Polyline
      path={google.maps.geometry.encoding.decodePath(props.overview_polyline)} options={{strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 10, geodesic: true }}  />
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>)
}
))

export default MyMapComponent;