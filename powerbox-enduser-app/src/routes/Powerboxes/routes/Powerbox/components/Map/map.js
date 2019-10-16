import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'

const mapStyles = {
  position: 'relative',
  width: '550px',
  height: '200px'
}
const containerStyle = { position: 'relative' }

function MapContainer({ google, lattitude, longitude, powerbox }) {
  const [showInfoWindow, setShowInfoWindow] = useState(false)

  const handleMouseOver = e => {
    setShowInfoWindow(true)
  }
  const handleMouseExit = e => {
    setShowInfoWindow(false)
  }

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
      disableDefaultUI>
      <Marker
        position={{ lat: lattitude, lng: longitude }}
        label={powerbox.id}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseExit}>
        {showInfoWindow && (
          <InfoWindow>
            <h4>hello</h4>
          </InfoWindow>
        )}
      </Marker>
    </Map>
  )
}

MapContainer.propTypes = {
  lattitude: PropTypes.number.isRequired, // from enhancer (withProps)
  longitude: PropTypes.number.isRequired // from enhancer (withProps)
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBra8uiHtHdDY0X2-d75t9w154iABNovcE'
})(MapContainer)
