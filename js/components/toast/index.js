import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  H3,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  Toast
} from "native-base";

import { connect } from "react-redux";
import styles from "./styles";

class ToastNB extends Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    console.log('here is ', this.props)
    return (
      <Container style={styles.container}>
          <Button
            onPress={() => {
              this.props.remove(this.props.marker)
              Toast.show({
                text: "Note removed",
                buttonText: "Okay"
              })}}
          >
            <Text>Remove Note</Text>
          </Button>
      </Container>
    );
  }
}

export default ToastNB;

const mapDispatch = dispatch => {
  return {
    removeMarker: marker => {
      const action = removeMarkerThunk(marker)
      dispatch(action)
    }
  }
}
