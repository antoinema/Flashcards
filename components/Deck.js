import React, { Component } from 'react'
import { Text, Header, Button } from 'react-native-elements'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../selectors'
import { Constants } from 'expo'
import PropTypes from 'prop-types'
import TitleHeader from './TitleHeader'

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
          outerContainerStyles={styles.header}
          statusBarProps={{ barStyle: 'light-content' }}
          leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            underlayColor: '#324C66',
            //https://github.com/react-community/react-navigation/issues/1522
            onPress: () => navigation.goBack(null)
          }}
          centerComponent={<TitleHeader title={this.props.deck.title} />}
        />
        <ScrollView style={styles.body}>
          <Text h1 style={styles.title}>
            {this.props.deck.title}
          </Text>
          <Text h4 style={styles.title2}>
            ({this.props.deck.cards.length} cards)
          </Text>

          <Button
            large
            title="Start Quiz"
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate('Quiz', {
                deckId: navigation.state.params.deckId
              })
            }
          />

          <Button
            title="Add Card"
            buttonStyle={styles.button}
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#324C66'
  },
  body: {},
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold'
  },
  title: {
    paddingTop: 20,
    textAlign: 'center'
  },
  title2: {
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'center'
  },
  button: {
    marginTop: 15
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    deck: getDeck(state, ownProps.navigation.state.params.deckId)
  }
}

export default connect(mapStateToProps, null)(Deck)
