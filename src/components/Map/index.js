import React, { Component, Fragment } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import { getPixelSize } from '../../utils';

import Search from '../Search'
import Directions from '../Directions'
import Details from "../Details";

import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";

import {
    Back,
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall
  } from './styles';
  
Geocoder.init("AIzaSyB1O8amubeMkw_7ok2jUhtVj9IkME9K8sc");

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
        location: null
    };

    // Searching the user's location on the map
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(

            // Success
            async ({ coords: { latitude, longitude } }) => {

                // Receiving the smallest location information
                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const location = address.substring(0, address.indexOf(","));
                
                this.setState({
                    location,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
            },

            // Error
            () => {}, 
            {
                timeout: 2000, // Seek location for two seconds
                enableHighAccuracy: true, // Searching for location by GPS
                maximumAge: 1000,
            }
        );
    }

    handleLocationSelected = (data, { geometry }) => {
        const { 
            location: { lat: latitude, lng: longitude } 
        } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                // Retrieving location text as title
                title: data.structured_formatting.main_text
            }
        });
    };

    // Defining back function
    handleBack = () => {
        this.setState({ destination: null });
    };

    render() {
        const { region, destination, duration, location } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}

                    //  Setting the start position of the map
                    region={ region }

                    // Placing symbol in user position
                    showsUserLocation

                    // Show map loading
                    loadingEnabled

                    // Referencing the created map element
                    ref={el => this.mapView = el}
                >
                    { destination && (
                        <Fragment>
                            <Directions 
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    this.setState({ duration: Math.floor(result.duration) });

                                    this.MapView.fitToCoordinates(result.coordinates, {
                                        adgePadding: {
                                            right: getPixelSize(50),
                                            left: getPixelSize(50),
                                            top: getPixelSize(50),
                                            bottom: getPixelSize(350)
                                        }
                                    });
                                }}
                            />
                            <Marker
                                coordinate={destination}
                                anchor={{ x: 0, y: 0 }}
                                image={markerImage}
                            >
                                <LocationBox>
                                    <LocationText>{destination.title}</LocationText>
                                </LocationBox>
                            </Marker>

                            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                                <LocationBox>

                                    {/* Receiving the duration of the route */}
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                            
                                    {/* Showing location name */}
                                    <LocationText>{location}</LocationText>
                        
                                </LocationBox>
                            </Marker>
                        </Fragment>
                    )}
                </MapView>
                
                {destination ? (
                    <Fragment>
                        <Back onPress={this.handleBack}>
                            <Image source={backImage} />
                        </Back>
                        <Details />
                    </Fragment>
                ) : (
                    <Search onLocationSelected={this.handleLocationSelected} />
                )}
            </View>
        );
    }
}
