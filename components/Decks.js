import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getAllDecks, getNotificationStatus } from '../selectors'
import { FlatList, View, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-native-elements'
import { setLocalNotification } from '../helpers'
import {
  mystyles,
  statusBarStyle,
  centerHeaderComponentStyle,
  iconHeaderComponentStyle
} from '../styles/styles'

import * as colors from '../styles/colors'

class DeckListItem extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    currentNotificationStatus: PropTypes.bool
  }

  _onPress = () => {
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <ListItem
        onPress={this._onPress}
        title={this.props.item.title}
        badge={{
          value: this.props.item.cards.length + ' cards',
          textStyle: { color: 'white' }
        }}
      />
    )
  }
}

class Decks extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    currentNotificationStatus: PropTypes.bool
  }
  _onPress = id => {
    this.props.navigation.navigate('Deck', { deckId: id })
  }
  renderDeckListItem = ({ item }) => {
    return <DeckListItem onPress={this._onPress} id={item.id} item={item} />
  }

  componentDidMount() {
    setLocalNotification(
      this.props.dispatch,
      this.props.currentNotificationStatus
    )
  }

  render() {
    const { decks, navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={mystyles.header}
          statusBarProps={statusBarStyle}
          centerComponent={{
            text: 'All Decks',
            style: centerHeaderComponentStyle
          }}
          rightComponent={{
            icon: 'add',
            ...iconHeaderComponentStyle,
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
    backgroundColor: colors.background
  },
  body: {}
})

const mapStateToProps = state => {
  return {
    decks: getAllDecks(state),
    currentNotificationStatus: getNotificationStatus(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
