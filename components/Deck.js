import React, { Component } from 'react'
import { Text, Header, Button } from 'react-native-elements'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../selectors'
import PropTypes from 'prop-types'
import {
  mystyles,
  statusBarStyle,
  centerHeaderComponentStyle,
  iconHeaderComponentStyle
} from '../styles/styles'

import * as colors from '../styles/colors'

class Deck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={mystyles.header}
          statusBarProps={statusBarStyle}
          leftComponent={{
            icon: 'arrow-back',
            ...iconHeaderComponentStyle,
            //https://github.com/react-community/react-navigation/issues/1522
            onPress: () => navigation.goBack(null)
          }}
          centerComponent={{
            text: this.props.deck.title,
            style: centerHeaderComponentStyle
          }}
        />
        <ScrollView>
          <Text h1 style={mystyles.title}>
            {this.props.deck.title}
          </Text>
          <Text h4 style={mystyles.title2}>
            ({this.props.deck.cards.length} cards)
          </Text>

          <Button
            large
            title="Start Quiz"
            buttonStyle={mystyles.button}
            onPress={() =>
              navigation.navigate('Quiz', {
                deckId: navigation.state.params.deckId
              })
            }
          />

          <Button
            title="Add Card"
            buttonStyle={mystyles.button}
            onPress={() =>
              navigation.navigate('NewCard', {
                deckId: navigation.state.params.deckId
              })
            }
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    deck: getDeck(state, ownProps.navigation.state.params.deckId)
  }
}

export default connect(mapStateToProps, null)(Deck)
