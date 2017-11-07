import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import Card from './Card'
import PropTypes from 'prop-types'

class CardStack extends Component {
  state = {
    enter: new Animated.Value(0.5),
    currentCardIndex: 0
  }

  static propTypes = {
    cards: PropTypes.array.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    onQuestionAnswered: PropTypes.func.isRequired,
    resetScore: PropTypes.func.isRequired
  }

  _goToNextCard() {
    const cards = this.props.cards
    const currentCardIndex = this.state.currentCardIndex
    this.setState({
      currentCardIndex:
        currentCardIndex + 1 > cards.length - 1 ? -1 : currentCardIndex + 1
    })
  }

  componentDidMount() {
    this._animateEntrance()
  }

  _animateEntrance() {
    Animated.spring(this.state.enter, { toValue: 1, friction: 8 }).start()
  }

  _resetStack = () => {
    this.state.enter.setValue(0)
    this.setState({ currentCardIndex: 0 })
    this._animateEntrance()
  }

  _resetState = () => {
    this.state.enter.setValue(0)
    this._goToNextCard()
    this._animateEntrance()
  }

  _questionAnswered = answer => {
    this.props.onQuestionAnswered(this.state.currentCardIndex, answer)
    this._resetState()
  }

  render() {
    let { enter } = this.state

    let scale = enter

    let animatedCardStyles = {
      transform: [{ scale }]
    }

    const currentCard = this.props.cards[this.state.currentCardIndex]
    return this.state.currentCardIndex >= 0 ? (
      <View>
        <Animated.View
          style={[animatedCardStyles, { backgroundColor: this.state.person }]}
        >
          <Card
            question={currentCard.question}
            answer={currentCard.answer}
            onCorrectAnswer={() => this._questionAnswered(true)}
            onIncorrectAnswer={() => this._questionAnswered(false)}
          />
        </Animated.View>
      </View>
    ) : (
      <View>
        <Text h2 style={styles.title}>
          Your score is {this.props.correctAnswers}/{this.props.cards.length}
        </Text>
        <Button
          title="Start again"
          onPress={() => {
            this.props.resetScore()
            this._resetStack()
          }}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    paddingTop: 20,
    textAlign: 'center'
  }
})

export default CardStack
