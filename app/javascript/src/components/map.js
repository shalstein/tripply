import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from 'react-google-maps';
import {InfoBox} from "react-google-maps/lib/components/addons/InfoBox";
import { Polyline } from "react-google-maps";


 const MyMapComponent = withScriptjs(withGoogleMap((props) => {
      const polyines = props.mapData.polylines.map(((polyline, index) => <Polyline
      path={google.maps.geometry.encoding.decodePath(polyline)} options={{strokeColor: '#FF0000', strokeOpacity: 1.0, geodesic: true, }} key={index} /> ))


      const infoBoxes = props.weather.map((weatherReport, index) => {return (
        <Marker defaultPosition={weatherReport.location} defaultIcon={{path: google.maps.SymbolPath.CIRCLE, scale: 2}} >
          <InfoBox  >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75,maxHeight: '1em', maxWidth: '1em'  }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                {weatherReport.description}
                lorem ipsum
              </div>
            </div>
          </InfoBox>
        </Marker>
      )

      })

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
          

                  {/* <Marker defaultPosition={{
                                lat: 40.8279183,
                                lng: -73.8336214
                            }} defaultIcon={{path: google.maps.SymbolPath.CIRCLE, scale: 2}} >
          <InfoBox  >
            <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                Hello, Taipei!
              </div>
            </div>
          </InfoBox>
        </Marker> */}

          {infoBoxes}

          {polyines}

        </GoogleMap>)
      }

    ))
  
 


export default MyMapComponent;