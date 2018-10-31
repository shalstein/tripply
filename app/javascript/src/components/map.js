import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import { Polyline } from "react-google-maps";


 const MyMapComponent = withScriptjs(withGoogleMap((props) => {



      const polyines = props.mapData.polylines.map(((polyline, index) => <Polyline
      path={google.maps.geometry.encoding.decodePath(polyline.path)} options={{strokeColor: polyline.color, strokeOpacity: 1.0, geodesic: true, strokeWeight: 3.5 }} key={index} /> ))


      const mapRef = mapElement => { 
        const {southwest, northeast} = props.mapData.bounds
        const bounds = new google.maps.LatLngBounds(southwest, northeast)
        mapElement && mapElement.fitBounds(bounds)
      }

        return (<GoogleMap
          ref={mapRef}
          defaultZoom={8}
          defaultOptions={{gestureHandling: 'greedy'}}

        >
          <Marker position={props.mapData.end_location} />
          <Marker position={props.mapData.start_location} defaultIcon={{path: google.maps.SymbolPath.CIRCLE, scale: 5}} />

          {polyines}

        </GoogleMap>)
      }

    ))
  
 


export default MyMapComponent;