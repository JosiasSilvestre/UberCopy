import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

// Receiving the origin and destination of the user on the map
const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey='AIzaSyB1O8amubeMkw_7ok2jUhtVj9IkME9K8sc'

        // Styling the line between source and destination
        strokeWidth={3}
        strokeColor='#222'
    />
);

export default Directions;
