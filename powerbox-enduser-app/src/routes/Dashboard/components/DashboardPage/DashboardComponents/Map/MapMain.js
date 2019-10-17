import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react'
import { Typography } from '@material-ui/core'
import { Card, CardHeader, Divider } from '@material-ui/core'

const mapStyles = {
  responsive: true,
  position: 'relative',
  width: '600px',
  height: '600px'
}

const containerStyle = { position: 'relative' }

const useStyles = makeStyles(theme => ({
  root: {
    height: '600px'
  }
}))

function MapMain({ google }) {
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState(false)

  const handleMouseOver = (props, marker, e) => {
    setShowInfoWindow(true)
    setActiveMarker(marker)
  }
  // eslint-disable-next-line no-unused-vars
  const handleMouseExit = (props, marker, e) => {
    setShowInfoWindow(false)
    setActiveMarker(false)
  }
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title="Device locations:">
          <Typography type="subtitle1">Powerbox device locations:s</Typography>
        </CardHeader>
        <Divider />
        <Map
          google={google}
          containerStyle={containerStyle}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 65.017732, lng: 25.481051 }}
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
            position={{ lat: 64.996383, lng: 25.509846 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <Marker
            position={{ lat: 65.035692, lng: 25.477183 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <Marker
            position={{ lat: 65.038395, lng: 25.498540 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <Marker
            position={{ lat: 65.026779, lng: 25.475871 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <Marker
            position={{ lat: 65.022397, lng: 25.469383 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <Marker
            position={{ lat: 65.003820, lng: 25.512634 }}
            // onMouseOver={handleMouseOver}
            onClick={handleMouseOver}
            // onMouseOut={handleMouseExit}
          />
          <InfoWindow marker={activeMarker} visible={showInfoWindow}>
            <div>
              <Typography type="subtitle1"></Typography>
            </div>
          </InfoWindow>
        </Map>
      </Card>
    </div>
  )
}

MapMain.propTypes = {
  lattitude: PropTypes.number.isRequired, // from enhancer (withProps)
  longitude: PropTypes.number.isRequired // from enhancer (withProps)
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBra8uiHtHdDY0X2-d75t9w154iABNovcE'
})(MapMain)
