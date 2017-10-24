import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Header } from 'react-native-elements'
import TitleHeader from './TitleHeader'
import Card from './Card'
import { Constants } from 'expo'
import { connect } from 'react-redux'
import { getCardsForDeck, getScore } from '../selectors'
import { submitAnswer } from '../actions'
import PropTypes from 'prop-types'

class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    onSubmitAnswer: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired
  }
  state = { currentCardIndex: 0 }

  questionAnswered = answer => {
    const { onSubmitAnswer, cards } = this.props
    onSubmitAnswer(cards[this.state.currentCardIndex].key, answer)
    this.setState({ currentCardIndex: this.state.currentCardIndex + 1 })
  }

  render() {
    const { navigation, cards, score } = this.props
    const currentCard = cards[this.state.currentCardIndex]
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={styles.header}
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            underlayColor: '#324C66',
            //https://github.com/react-community/react-navigation/issues/1522
            onPress: () => navigation.goBack(null)
          }}
          // centerComponent={<TitleHeader title={this.props.deck.title} />}
          centerComponent={<TitleHeader title="Hello" />}
        />

        <View style={styles.body}>
          {currentCard ? (
            <Card
              question={currentCard.question}
              answer={currentCard.answer}
              onCorrectAnswer={() => this.questionAnswered(true)}
              onIncorrectAnswer={() => this.questionAnswered(false)}
            />
          ) : (
            <Text>
              Your score is {score.correct}/{score.questionsNumber}
            </Text>
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
    score: getScore(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitAnswer: (cardId, correct) => {
      dispatch(submitAnswer(cardId, correct))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
