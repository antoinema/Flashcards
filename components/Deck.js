import React, { Component } from 'react'
import { Text, Header } from 'react-native-elements'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getDeck } from '../selectors'
import { Constants } from 'expo'

const TitleHeader = props => {
  return <Text style={styles.title}>{props.title}</Text>
}

class Deck extends Component {
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
          <Text>{this.props.deck.title}</Text>
        </ScrollView>
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
  },
  title: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    deck: getDeck(state, ownProps.navigation.state.params.deckId)
  }
}

export default connect(mapStateToProps, null)(Deck)
