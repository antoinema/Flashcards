import { StyleSheet, View, Animated } from 'react-native'
import React, { Component } from 'react'
import { Button, Text } from 'react-native-elements'
import Card from './Card'
import PropTypes from 'prop-types'
import ProgressBar from 'react-native-progress/Bar'
import { mystyles } from '../styles/styles'

class CardStack extends Component {
  state = {
    enter: new Animated.Value(0.5),
    currentCardIndex: 0
  }

  static propTypes = {
    cards: PropTypes.array.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    onQuestionAnswered: PropTypes.func.isRequired,
    resetScore: PropTypes.func.isRequired,
    onFinishedQuiz: PropTypes.func.isRequired
  }

  _goToNextCard() {
    const cards = this.props.cards
    const currentCardIndex = this.state.currentCardIndex
    const nextCardIndex =
      currentCardIndex + 1 > cards.length - 1 ? -1 : currentCardIndex + 1
    this.setState({
      currentCardIndex: nextCardIndex
    })
    nextCardIndex < 0 && this.props.onFinishedQuiz()
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
      <View style={styles.container}>
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
        <ProgressBar
          animated
          color="grey"
          progress={this.state.currentCardIndex / this.props.cards.length}
          width={300}
          style={styles.progressBar}
        />
        <Text>
          Question {this.state.currentCardIndex + 1} of{' '}
          {this.props.cards.length}
        </Text>
      </View>
    ) : (
      <View>
        <Text h3 style={mystyles.title}>
          Congrats, you finished the quiz!
        </Text>
        <Text h4 style={mystyles.title}>
          Your score is {this.props.correctAnswers}/{this.props.cards.length}
        </Text>
        <Button
          style={mystyles.button}
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
  container: {
    alignItems: 'center'
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 10
  }
})

export default CardStack
