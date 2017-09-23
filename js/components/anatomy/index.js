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

const marker = require("../../../img/blueDot.png")

class Anatomy extends Component {

  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.showModal = this.showModal.bind(this)
    this.updateRemainder = this.updateRemainder.bind(this)
    this.state = {
      currentLocation: {},  //move to store
      markers: [],          //move to store
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

  addMarker(event) {
    this.setState({isModalVisible: !this.state.isModalVisible} )
    event = this.state.currentLonLat
    const newMarker = {
      id: this.state.markers.length,
      title: this.state.remainder,
      coordinates: {
        latitude: event.latitude,
        longitude: event.longitude
      }
    }
    this.setState({
      markers: [...this.state.markers, newMarker],
      currentLonLat: [],
      remainder: ''
    })
  }

  updateRemainder(update) {
    this.setState({remainder: update})
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 0 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    console.log('current state ', this.state)
    const markers = this.state.markers
    const isModalVisible = this.state.isModalVisible
    const currentLocation = this.state.currentLocation
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

export default Anatomy;

const region = {
  latitude: 40.704926,
  longitude: -74.009432,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}
