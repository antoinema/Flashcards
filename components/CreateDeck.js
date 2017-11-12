import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Header
} from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'

import {
  mystyles,
  statusBarStyle,
  centerHeaderComponentStyle,
  iconHeaderComponentStyle
} from '../styles/styles'

import * as colors from '../styles/colors'

class CreateDeck extends Component {
  state = { error: false, title: '' }

  static propTypes = {
    onSaveNewDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  handleChangeText = text => this.setState({ error: false, title: text })
  _saveDetails = () => {
    const { navigation, onSaveNewDeck } = this.props
    if (this.state.title !== '') {
      const deck = {
        title: this.state.title
      }
      onSaveNewDeck(deck)
      navigation.goBack()
    } else {
      this.setState({ error: true })
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={statusBarStyle}
          outerContainerStyles={mystyles.header}
          leftComponent={{
            icon: 'cancel',
            ...iconHeaderComponentStyle,

            onPress: () => navigation.goBack()
          }}
          centerComponent={{
            text: 'New Deck',
            style: centerHeaderComponentStyle
          }}
          rightComponent={{
            icon: 'check',
            ...iconHeaderComponentStyle,

            onPress: () => this._saveDetails()
          }}
        />
        <View style={styles.body}>
          <FormLabel>Quiz title</FormLabel>
          <FormInput
            onChangeText={this.handleChangeText}
            shake={!this.state.error ? false : true}
          />
          {this.state.error && (
            <FormValidationMessage>Title cannot be empty</FormValidationMessage>
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  body: {
    marginTop: 20,
    backgroundColor: colors.inputBackground
  }
})
const mapDispatchToProps = dispatch => {
  return {
    onSaveNewDeck: data => {
      dispatch(addNewDeck(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateDeck)
