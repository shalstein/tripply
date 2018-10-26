import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import { Polyline } from "react-google-maps";


const MyMapComponent = withScriptjs(withGoogleMap((props) => {

  const polyines = props.overview_polyline.map(((polyline, index) => <Polyline
    path={google.maps.geometry.encoding.decodePath(polyline)} options={{strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2, geodesic: true, }} key={index} /> )) 

  return (<GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {polyines}

    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>)
}
))

export default MyMapComponent;