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
import { connect } from "react-redux"
import { Constants, Permissions, Notifications } from 'expo'
import geolib from 'geolib'

const marker = require("../../../img/blueDot.png")
const scroll = require("../../../img/scroll.png")

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
      currentLonLat: event.nativeEvent.coordinate || []
    })
  }

  addMarker() {
    this.setState({isModalVisible: !this.state.isModalVisible} )
    const latitude = this.state.currentLonLat.latitude
    const longitude = this.state.currentLonLat.longitude
    const distance = getDistance(this.props.currentLocation, {latitude, longitude})
    const newMarker = {
      id: this.props.markers.length+1,
      title: this.state.remainder,
      description: (distance/1609.34).toFixed(2) + ' miles away',
      coordinates: {
        latitude,
        longitude
      }
    }
    // distance <= 500 ? pushNotification(newMarker, distance) : console.log('')
    this.setState({
      currentLonLat: [],
      remainder: ''
    })
    this.props.setMarker(newMarker)
    this.props.addDistance({id: newMarker.id, distance})
  }

  updateRemainder(update) {
    this.setState({remainder: update})
  }

  async componentDidMount() {
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

    let result = await   
    Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && resut.status === 'granted') {
     console.log('Notification permissions granted.')
    }
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
          initialRegion={{ 
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
           }}
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
            title={marker.title}
            description={marker.description}
            image={scroll} />
          ))
         }
            <View>
              <FormModal showModal={this.showModal} isModalVisible={this.state.isModalVisible} addMarker={this.addMarker} updateRemainder={this.updateRemainder}/>
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
  console.log('this is the state ', state)
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

function getDistance(currentPos, marker) {
  return geolib.getDistance(currentPos, marker)
}

// function pushNotification (marker, distance) {
//   // console.log('you are here ', marker, distance)
//   // const localNotification = { 
//   //   title: 'You are close...',
//   //   body: marker.title + ' is ' + distance + ' meters away',
//   //   ios: {
//   //     sound: true
//   //   }
//   // }
//   console.log('about to do this now')
//   return Notifications.presentLocalNotificationAsync({ 
//     title: 'You are close...',
//     body: marker.title + ' is ' + distance + ' meters away',
//     ios: {
//       sound: true
//     }
//   })
// }


// const localNotification = {
//   title: 'Hello',
//   body: 'Your notification',
//   ios: {
//     sound: true
//   },
// };

// let t = new Date();
// t.setSeconds(t.getSeconds() + 10);
// const schedulingOptions = {
//     time: t,
//     repeat: 'minute'
//   };

// Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);