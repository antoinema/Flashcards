import React, { Component } from 'react'
import { Text, Header, Button } from 'react-native-elements'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../selectors'
import { Constants } from 'expo'
import PropTypes from 'prop-types'

const TitleHeader = props => {
  return <Text style={styles.headerTitle}>{props.title}</Text>
}

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired
}

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
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            underlayColor: '#324C66',
            onPress: () => navigation.goBack()
          }}
          centerComponent={<TitleHeader title={this.props.deck.title} />}
        />
        <ScrollView style={styles.body}>
          <Text h1 style={styles.title}>
            {this.props.deck.title}
          </Text>

          <Button large title="Start Quiz" buttonStyle={styles.button} />

          <Button
            title="Add Card"
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('NewCard')}
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
  body: {
    marginTop: 53
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold'
  },
  title: {
    paddingTop: 20,
    paddingBottom: 40
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
