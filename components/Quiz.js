import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import CardStack from './CardStack'
import { connect } from 'react-redux'
import { getCardsForDeck, getScore, getDeck } from '../selectors'
import { submitAnswer, resetScore } from '../actions'
import PropTypes from 'prop-types'
import { clearLocalNotification, setLocalNotification } from '../helpers'
import {
  mystyles,
  statusBarStyle,
  centerHeaderComponentStyle,
  iconHeaderComponentStyle
} from '../styles/styles'
import * as colors from '../styles/colors'

class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onSubmitAnswer: PropTypes.func.isRequired,
    onResetScore: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  state = { currentCardIndex: 0 }

  questionAnswered = (cardIndex, answer) => {
    const { onSubmitAnswer, cards } = this.props
    onSubmitAnswer(cards[cardIndex].key, answer)
  }
  finishedQuiz = () => {
    clearLocalNotification(this.props.dispatch)
    setLocalNotification(this.props.dispatch, null)
  }
  render() {
    const { navigation, cards, onResetScore, score } = this.props
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={mystyles.header}
          statusBarProps={statusBarStyle}
          leftComponent={{
            icon: 'arrow-back',
            ...iconHeaderComponentStyle,
            //https://github.com/react-community/react-navigation/issues/1522
            onPress: () => {
              onResetScore()
              navigation.goBack(null)
            }
          }}
          centerComponent={{
            text: this.props.deck.title,
            style: centerHeaderComponentStyle
          }}
        />

        <View>
          {cards.length <= 0 ? (
            <Text>This quiz has no questions</Text>
          ) : (
            <CardStack
              cards={cards}
              onQuestionAnswered={this.questionAnswered}
              correctAnswers={score.correct}
              resetScore={onResetScore}
              onFinishedQuiz={this.finishedQuiz}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    cards: getCardsForDeck(state, ownProps.navigation.state.params.deckId),
    score: getScore(state),
    deck: getDeck(state, ownProps.navigation.state.params.deckId)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitAnswer: (cardId, correct) => {
      dispatch(submitAnswer(cardId, correct))
    },
    onResetScore: () => {
      dispatch(resetScore())
    },
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
