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
import { addNewCard } from '../actions'
import { Constants } from 'expo'

class CreateCard extends Component {
  state = { error: false, title: '' }

  static propTypes = {
    onSaveNewCard: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }

  handleChangeQuestion = text =>
    this.setState({ errorQuestion: false, question: text })
  handleChangeAnswer = text =>
    this.setState({ errorAnswer: false, answer: text })
  _saveDetails = () => {
    const { navigation, onSaveNewCard } = this.props
    if (!this.state.question) {
      this.setState({ errorQuestion: true })
      return
    }
    if (!this.state.answer) {
      this.setState({ errorAnswer: true })
      return
    }
    const card = {
      question: this.state.question,
      answer: this.state.answer
    }
    onSaveNewCard(card, navigation.state.params.deckId)
    navigation.goBack()
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
          centerComponent={{ text: 'New Card', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'check',
            color: '#fff',
            underlayColor: '#324C66',
            onPress: () => this._saveDetails()
          }}
          backgroundColor={'#324C66'}
        />
        <View style={styles.body}>
          <FormLabel>Question</FormLabel>
          <FormInput
            onChangeText={this.handleChangeQuestion}
            shake={!this.state.errorQuestion ? false : true}
          />
          {this.state.errorQuestion && (
            <FormValidationMessage>
              Question cannot be empty
            </FormValidationMessage>
          )}
          <FormLabel>Answer</FormLabel>
          <FormInput
            onChangeText={this.handleChangeAnswer}
            shake={!this.state.errorAnswer ? false : true}
          />
          {this.state.errorAnswer && (
            <FormValidationMessage>
              Answer cannot be empty
            </FormValidationMessage>
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
  }
})
const mapDispatchToProps = dispatch => {
  return {
    onSaveNewCard: (card, deckId) => {
      dispatch(addNewCard(card, deckId))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreateCard)
