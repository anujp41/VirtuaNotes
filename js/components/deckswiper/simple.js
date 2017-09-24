import React, { Component } from "react";
import { Image, View } from "react-native";
import { connect } from "react-redux";


import {
	Container,
	Header,
	Title,
	Button,
	IconNB,
	DeckSwiper,
	Card,
	CardItem,
	Icon,
	Thumbnail,
	Text,
	Left,
	Right,
	Body,
	Content,
} from "native-base";

import styles from "./styles";

const cardOne = require("../../../img/swiper-1.png");
const cardTwo = require("../../../img/swiper-2.png");
const cardThree = require("../../../img/swiper-3.png");
const cardFour = require("../../../img/swiper-4.png");

const image = require("../../../img/marcello.jpg");

const cards = [
	{
		text: "Card One",
		name: "One",
		image: cardOne,
	},
	{
		text: "Card Two",
		name: "Two",
		image: cardTwo,
	},
	{
		text: "Card Three",
		name: "Three",
		image: cardThree,
	},
	{
		text: "Card Four",
		name: "Four",
		image: cardFour,
	},
];

class SimpleDeck extends Component {
	// eslint-disable-line

	render() {
		const markers = this.props.markers
		
		if (markers.length) {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Your List</Title>
					</Body>
					<Right />
				</Header>

				<View style={{ flex: 1, padding: 12 }}>
					<DeckSwiper
						dataSource={markers}
						looping={true}
						renderItem={item =>
							<Card style={{ elevation: 3 }}>
								<CardItem>
									<Left>
										<Thumbnail source={image} />
										<Body>
											<Text>
												{item.title}
											</Text>
											<Text note>{item.description}</Text>
										</Body>
									</Left>
								</CardItem>
								<CardItem cardBody>
									<Image
										style={{
											resizeMode: "cover",
											width: null,
											flex: 1,
											height: 300,
										}}
										source={image}
									/>
								</CardItem>
								<CardItem>
									<IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
									<Text>
										{item.title}
									</Text>
								</CardItem>
							</Card>}
					/>
				</View>
			</Container>
		)
		} else {
			return (
				<Container style={styles.container}>
					<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Title>Your List</Title>
					</Body>
					<Right />
				</Header>

					<View><Text>You do not have any remainders yet</Text></View>
				</Container>
			)
		}
	}
}

const mapState = state => {
	return {
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
  
  export default connect(mapState, mapDispatch)(SimpleDeck)
