import React, { Component } from "react";
import { Image, View } from "react-native";

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
	List,
	ListItem,
} from "native-base";
import styles from './styles'
import SimpleDeck from './simple'

class NHDeckSwiper extends Component {
	// eslint-disable-line

	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Your notes</Title>
					</Body>
					<Right />
				</Header>

				<SimpleDeck />


			</Container>
		);
	}
}

export default NHDeckSwiper;
