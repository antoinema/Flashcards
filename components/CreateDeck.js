import React, { Component } from 'react'
import { View, Button } from 'react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'

class CreateDeck extends Component {
  state = { error: false, title: '' }

  static propTypes = {
    onSaveNewDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  handleChangeText = text => this.setState({ error: false, title: text })
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Add New Deck',
      headerRight: <Button title="Save" onPress={() => params.handleSave()} />,
      headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} />
    }
  }
  componentDidMount() {
    // https://github.com/react-community/react-navigation/issues/145
    this.props.navigation.setParams({ handleSave: this._saveDetails })
  }
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
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={this.handleChangeText}
          shake={!this.state.error ? false : true}
        />
        {this.state.error && (
          <FormValidationMessage>Title cannot be empty</FormValidationMessage>
        )}
      </View>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSaveNewDeck: data => {
      dispatch(addNewDeck(data))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateDeck)
