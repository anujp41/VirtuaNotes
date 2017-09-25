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
import Toast from "../toast"
import { removeMarkerThunk } from '../../store'
import styles from "./styles";

const cardOne = require("../../../img/swiper-1.png");
const cardTwo = require("../../../img/swiper-2.png");
const cardThree = require("../../../img/swiper-3.png");
const cardFour = require("../../../img/swiper-4.png");

class SimpleDeck extends Component {
	// eslint-disable-line

	render() {
		const markers = this.props.markers		
		if (markers.length) {
		return (
			<Container style={styles.container}>
				
				<View style={{ flex: 1, padding: 12 }}>
					<DeckSwiper
						dataSource={markers}
						looping={true}
						renderItem={item =>
							<Card style={{ elevation: 3 }}>								
								<CardItem>
									<Left>
										<Thumbnail source={{uri: item.image}} />
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
										source={{uri: item.image}}
									/>
								</CardItem>
								<CardItem>
									<IconNB name={"ios-heart"} style={{ color: "#ED4A6A" }} />
									<Text>
										{item.title}
									</Text>
								</CardItem>
								<Right><Toast remove={this.props.removeMarker} marker={item}/></Right>
							</Card>}
					/>
				</View>
			</Container>
		)
		} else {
			return (
				<Container style={styles.container}>

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
	  removeMarker: marker => {
		const action = removeMarkerThunk(marker)
		dispatch(action)
	  }
	}
  }
  
export default connect(mapState, mapDispatch)(SimpleDeck)
