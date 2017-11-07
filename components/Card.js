import React, { Component } from 'react'
import { StyleSheet, View, Easing, Text, Platform } from 'react-native'
import FlipView from './FlipView'
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types'

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
          style={{ flex: 1 }}
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
          buttonStyle={styles.button}
          backgroundColor="#03A9F4"
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
        <Text style={styles.question}>{this.props.answer} </Text>
        <View>
          <Button
            buttonStyle={styles.button}
            backgroundColor="green"
            title="Correct"
            onPress={() => {
              this._flip()
              onCorrectAnswer()
            }}
          />
          <Button
            backgroundColor="red"
            buttonStyle={styles.button}
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
    fontSize: 24
  },
  container: {
    flex: 1,
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
    borderRadius: 2,
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
