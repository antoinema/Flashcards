import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getAllDecks } from '../selectors'
import { FlatList, Text, Button, View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { List, ListItem } from 'react-native-elements'

class DeckListItem extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
  }

  _onPress = () => {
    this.props.onPress(this.props.id)
  }

  render() {
    return <ListItem onPress={this._onPress} title={this.props.item.title} />
  }
}

class Decks extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
  }
  _onPress = id => {
    this.props.navigation.navigate('Deck', { deckId: id })
  }
  renderDeckListItem = ({ item }) => {
    return <DeckListItem onPress={this._onPress} id={item.id} item={item} />
  }

  render() {
    const { decks, navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={styles.header}
          centerComponent={{ text: 'All Decks', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'add',
            color: '#fff',
            underlayColor: '#324C66',
            onPress: () => navigation.navigate('NewDeck')
          }}
        />
        <List style={styles.body}>
          <FlatList data={decks} renderItem={this.renderDeckListItem} />
        </List>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  header: {
    backgroundColor: '#324C66'
  },
  body: {
    marginTop: 53
  }
})

const mapStateToProps = state => {
  return {
    decks: getAllDecks(state)
  }
}
export default connect(mapStateToProps, null)(Decks)
