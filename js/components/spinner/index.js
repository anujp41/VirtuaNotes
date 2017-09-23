import React, { Component } from "react";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Spinner,
  Left,
  Right,
  Body
} from "native-base";

import styles from "./styles";

class NHSpinner extends Component {
  // eslint-disable-line

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>...Your map is loading</Title>
          </Body>
        </Header>

        <Content>
          <Spinner color="blue" />
        </Content>
      </Container>
    );
  }
}

export default NHSpinner;
