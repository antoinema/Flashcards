import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Easing,
  Text,
  Platform,
  ScrollView
} from 'react-native'
import FlipView from './FlipView'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { mystyles } from '../styles/styles'

class Card extends Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onCorrectAnswer: PropTypes.func.isRequired,
    onIncorrectAnswer: PropTypes.func.isRequired
  }

  state = { isFlipped: false }

  render = () => {
    return (
      <View style={styles.container}>
        <FlipView
          front={this._renderFront()}
          back={this._renderBack()}
          isFlipped={this.state.isFlipped}
          flipAxis="y"
          flipEasing={Easing.out(Easing.ease)}
          flipDuration={250}
          perspective={800}
        />
      </View>
    )
  }

  _renderFront = () => {
    return (
      <View style={styles.face}>
        <Text style={styles.question}>{this.props.question}</Text>
        <Button
          buttonStyle={mystyles.button}
          title="Answer"
          onPress={this._flip}
        />
      </View>
    )
  }

  _renderBack = () => {
    const { onCorrectAnswer, onIncorrectAnswer } = this.props
    return (
      <View style={styles.face}>
        <Text style={styles.question}>{this.props.question}</Text>
        <ScrollView style={{ flex: 1 }}>
          <Text style={styles.answer}>{this.props.answer} </Text>
        </ScrollView>
        <View>
          <Button
            buttonStyle={mystyles.button}
            backgroundColor="green"
            icon={{ name: 'thumb-up' }}
            title="Correct"
            onPress={() => {
              this._flip()
              onCorrectAnswer()
            }}
          />
          <Button
            backgroundColor="red"
            buttonStyle={mystyles.button}
            icon={{ name: 'thumb-down' }}
            title="Incorrect"
            onPress={() => {
              this._flip()
              onIncorrectAnswer()
            }}
          />
        </View>
      </View>
    )
  }

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }
}

const styles = StyleSheet.create({
  question: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    marginBottom: 10
  },
  answer: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  container: {
    alignItems: 'center',
    marginTop: 56
  },
  card: {
    padding: 15
  },
  face: {
    width: 300,
    height: 400,
    padding: 15,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'grey',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  button: {
    borderRadius: 2,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  }
})

export default Card
