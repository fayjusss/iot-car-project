import React from 'react'
import { GoogleApiWrapper, Map } from 'google-maps-react'

const mapStyles = {
  position: 'relative',
  width: '550px',
  height: '200px'
}
const containerStyle = { position: 'relative' }

function MapContainer({ google }) {
  return (
    <Map
      google={google}
      containerStyle={containerStyle}
      zoom={12}
      style={mapStyles}
      initialCenter={{ lat: 64.999458, lng: 25.51055 }}
      defaultOptions={{
        // these following 7 options turn certain controls off see link below
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
      disableDefaultUI
    />
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBra8uiHtHdDY0X2-d75t9w154iABNovcE'
})(MapContainer)
