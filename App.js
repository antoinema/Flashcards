import React from 'react'
import { View } from 'react-native'
import Decks from './containers/Decks'
import store from './store'
import { Provider } from 'react-redux'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Decks />
        </View>
      </Provider>
    )
  }
}
