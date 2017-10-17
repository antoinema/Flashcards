import React, { Component } from 'react'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { getDeck } from '../selectors'

class Deck extends Component {
  render() {
    return <Text h1>{this.props.deck.title}</Text>
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.navigation)
  return {
    deck: getDeck(state, ownProps.navigation.state.params.deckId)
  }
}

export default connect(mapStateToProps, null)(Deck)
