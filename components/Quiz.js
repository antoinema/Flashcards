import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header, Button } from 'react-native-elements'
import TitleHeader from './TitleHeader'
import CardStack from './CardStack'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { getCardsForDeck, getScore, getDeck } from '../selectors'
import { submitAnswer, resetScore } from '../actions'
import PropTypes from 'prop-types'

class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onSubmitAnswer: PropTypes.func.isRequired,
    onResetScore: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  }
  state = { currentCardIndex: 0 }

  questionAnswered = (cardIndex, answer) => {
    const { onSubmitAnswer, cards } = this.props
    onSubmitAnswer(cards[cardIndex].key, answer)
  }

  render() {
    const { navigation, cards, onResetScore, score } = this.props
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={styles.header}
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            underlayColor: '#324C66',
            //https://github.com/react-community/react-navigation/issues/1522
            onPress: () => {
              onResetScore()
              navigation.goBack(null)
            }
          }}
          centerComponent={<TitleHeader title={this.props.deck.title} />}
        />

        <View style={styles.body}>
          {cards.length <= 0 ? (
            <Text>This quiz has no questions</Text>
          ) : (
            <CardStack
              cards={cards}
              onQuestionAnswered={this.questionAnswered}
              correctAnswers={score.correct}
              resetScore={onResetScore}
            />
          )}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    flex: 1
  },
  header: {
    backgroundColor: '#324C66'
  },
  body: {
    marginTop: 60
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
