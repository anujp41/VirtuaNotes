import React, { Component } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import styles from "./styles";

export default class FormModal extends Component {

    constructor(props) {
        super(props)
        this._renderButton = this._renderButton.bind(this)
        this._renderModalContent = this._renderModalContent.bind(this)
    }

    _renderButton = (text) => (
        <TouchableOpacity onPress={this.props.showModal}>
          <View style={styles.button}>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
      );
    
    _renderModalContent = () => (
        <View style={styles.modalContent}>
          <Text>Hello!</Text>
          {this._renderButton('Submit') }
        </View>
      );

    render() {
        console.log('check the props ', this.props)
        const isModalVisible = this.props.isModalVisible
        return (
            <View>
            <Modal
                isVisible={isModalVisible}
                backdropColor={'#52B3D9'}
                backdropOpacity={0.75}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}
                >
                {this._renderModalContent()}
            </Modal>
            </View>
        )
    }
}