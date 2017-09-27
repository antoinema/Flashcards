import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getAllDecks } from '../selectors'
import { FlatList, Text } from 'react-native'
import { connect } from 'react-redux'

class Decks extends Component {
  static propTypes = {
    decks: PropTypes.object.isRequired
  }

  renderDeckListItem = ({ deck }) => {
    <Text>{deck.title}</Text>
  }

  render() {
    const { decks } = this.props
    //return <FlatList data={decks} renderItem={this.renderDeckListItem} />
    return (
      <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    decks: getAllDecks(state)
  }
}
export default connect(mapStateToProps, null)(Decks)
