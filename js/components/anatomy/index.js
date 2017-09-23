import React, { Component } from "react";
import {MapView} from 'expo';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Left,
  Right,
  Body
} from "native-base";
import FormModal from './modal'
import styles from "./styles";
import NHSpinner from '../spinner'
import { setCurrentThunk, getMarkersThunk, addMarkerThunk, addDistanceThunk } from '../../store'
import { connect } from "react-redux";
import geolib from 'geolib'

const marker = require("../../../img/blueDot.png")

class Anatomy extends Component {

  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.showModal = this.showModal.bind(this)
    this.updateRemainder = this.updateRemainder.bind(this)
    this.state = {
      isModalVisible: false,
      currentLonLat: [],
      remainder: '',
      errorMessage: null
    }
  }

  showModal(event) {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      currentLonLat: event.nativeEvent.coordinate
    })
  }

  addMarker() {
    this.setState({isModalVisible: !this.state.isModalVisible} )
    event = this.state.currentLonLat
    const newMarker = {
      id: this.props.markers.length+1,
      title: this.state.remainder,
      coordinates: {
        latitude: event.latitude,
        longitude: event.longitude
      }
    }
    this.setState({
      currentLonLat: [],
      remainder: ''
    })
    this.props.setMarker(newMarker)
    this.props.addDistance({id: newMarker.id, distance: getDistance(this.props.currentLocation, newMarker.coordinates)})
  }

  updateRemainder(update) {
    this.setState({remainder: update})
  }

  componentDidMount() {
    this.props.getMarkers
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.props.setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 0 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    const markers = this.props.markers
    const isModalVisible = this.state.isModalVisible
    const currentLocation = this.props.currentLocation || null
    if (currentLocation.latitude) {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

          <MapView
          style={{ flex: 1 }}
          initialRegion={ region }
          onPress={this.showModal}
          >
          
          <MapView.Marker
            image={marker}
            coordinate={ currentLocation }
            title={'Your Location'} />
          
          {markers.map(marker => (
            <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.title} />
          ))
         }
            <View>
              <FormModal isModalVisible={this.state.isModalVisible} addMarker={this.addMarker} updateRemainder={this.updateRemainder}/>
            </View>
         </MapView>

      </Container>
    );
  } else {
    return (
        <NHSpinner />
      )
    }
  }
}

const mapState = state => {
  console.log('here is my state ', state)
  return {
    currentLocation: state.currentLocation,
    markers: state.markers
  }
}

const mapDispatch = dispatch => {
  return {
    setCurrentLocation: location => {
      const action = setCurrentThunk(location)
      dispatch(action)
    },
    getMarkers: () => {
      const action = getMarkersThunk()
      dispatch(action)
    },
    setMarker: marker => {
      const action = addMarkerThunk(marker)
      dispatch(action)
    },
    addDistance: distance => {
      const action = addDistanceThunk(distance)
      dispatch(action)
    }
  }
}

export default connect(mapState, mapDispatch)(Anatomy)

const region = {
  latitude: 40.704926,
  longitude: -74.009432,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

function getDistance(currentPos, marker) {
  return geolib.getDistance(currentPos, marker)
}