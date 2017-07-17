import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {GoogleMap,withGoogleMap, Marker} from 'react-google-maps';

const propTypes = {
};

const LocationMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    >
    {props.markers.map(marker => (
        <Marker
            {...marker}
            />
    ))}
  </GoogleMap>
));

class LocationPage extends Component {
    state = {
        markers: [
            {
                position: {
                    lat: 25.0112183,
                    lng: 121.52067570000001,
                },
                key: `Taiwan`,
                defaultAnimation: 2,
            },
            {
                position: {
                    lat: -25.363882,
                    lng: 131.044922
                },
                key: `Tailand`,
                defaultAnimation: 2,
            },
        ],
    }
    render() {
        return(
            <div>
                <LocationMap
                    containerElement={
                        <div style={{ height: '300px' }} />
                    }
                    mapElement={
                        <div style={{ height: '300px' }} />
                    }
                    markers={this.state.markers}>

                </LocationMap>
            </div>
        );
    }
}
LocationPage.propTypes = propTypes;
export default LocationPage;
