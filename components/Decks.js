import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getAllDecks } from '../selectors'
import { FlatList, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class DeckListItem extends Component {
  _onPress = () => {
    this.props.onPress(this.props.id)
  }

  render() {
    return <Text onPress={this._onPress}>{this.props.children}</Text>
  }
}

class Decks extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'All Decks',
    headerRight: (
      <Button title="+" onPress={() => navigation.navigate('NewDeck')} />
    )
  })

  _onPress = id => {
    this.props.navigation.navigate('Deck', { deckId: id })
  }

  renderDeckListItem = ({ item }) => {
    return (
      <DeckListItem onPress={this._onPress} id={item.id}>
        {item.title}
      </DeckListItem>
    )
  }

  render() {
    const { decks } = this.props
    return <FlatList data={decks} renderItem={this.renderDeckListItem} />
  }
}

const mapStateToProps = state => {
  return {
    decks: getAllDecks(state)
  }
}
export default connect(mapStateToProps, null)(Decks)
