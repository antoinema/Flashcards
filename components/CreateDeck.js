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
import { Constants } from 'expo'

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
          leftComponent={{
            icon: 'cancel',
            color: '#fff',
            underlayColor: '#324C66',
            onPress: () => navigation.goBack()
          }}
          centerComponent={{ text: 'New Deck', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'check',
            color: '#fff',
            underlayColor: '#324C66',
            onPress: () => this._saveDetails()
          }}
          backgroundColor={'#324C66'}
        />
        <View style={styles.body}>
          <FormLabel>Name</FormLabel>
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  body: {
    marginTop: 53
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
