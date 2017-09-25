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

const images = [
  'http://media.npr.org/assets/img/2012/03/29/p.179___ja_holson_sq-3d64e19c9957a6a8e12809f95ec3fff372aadb68-s900-c85.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/c3/29/67/c329679d21b90e81eed2045206500187.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/7b/bf/1e/7bbf1e346c4d0f0d1e0a94fa9727976b.jpg',
  'https://i.pinimg.com/736x/9c/39/92/9c3992a97c22306d12c386f2f085e638--old-hollywood-hollywood-stars.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/dd/6b/9a/dd6b9a877c0aacf1516a29eb88eca16d--old-hollywood-classic-hollywood.jpg',
  'https://i.pinimg.com/736x/da/a4/66/daa466145a5c60cbc80a9f942fe14a4c--old-hollywood-classic-hollywood.jpg',
  'https://media.gq.com/photos/5582f0c33655c24c6c952250/master/w_704,h_964,c_limit/how-to-2010-03-leading-men-lm-woody-allen.jpg',
  'http://scontent.cdninstagram.com/t51.2885-15/s480x480/e35/c0.113.1080.1080/15099441_588765081321871_2647893977033867264_n.jpg',
  'https://media.gq.com/photos/5582f0cc3655c24c6c95226c/master/w_704,h_964,c_limit/how-to-2010-03-leading-men-lm-douglas-fairbanks-jr.jpg',
  'http://esq.h-cdn.co/assets/cm/15/06/54d1c5b4d135b_-_esq-10-gregory-peck-best-dressed-movie-stars-2013-mdn.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/89/d7/41/89d741ce997b8038981eb62501c6e730.jpg',
  'https://harderslive.files.wordpress.com/2011/08/young-steve-mcqueen.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/82/c7/f3/82c7f3a18587c3ac342e3340aa9fb115.png',
  'http://x17online.com/media/images/2011/11/nataliewood230headshot.jpg'
]

returnImage = images => images[Math.floor(Math.random() * images.length)]

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
    const image = returnImage(images)
    const newMarker = {
      id: this.props.markers.length+1,
      title: this.state.remainder,
      description: (distance/1609.34).toFixed(2) + ' miles away',
      coordinates: {
        latitude,
        longitude
      },
      image
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

    // let result = await   
    // Permissions.askAsync(Permissions.NOTIFICATIONS);
    // if (Constants.lisDevice && resut.status === 'granted') {
    //  console.log('Notification permissions granted.')
    // }
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