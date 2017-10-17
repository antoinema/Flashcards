import React from 'react'
import Decks from './components/Decks'
import Deck from './components/Deck'
import CreateDeck from './components/CreateDeck'

import store from './store'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

const DecksNavigator = StackNavigator(
  {
    Home: { screen: Decks },
    Deck: { screen: Deck }
  },
  {
    headerMode: 'none'
  }
)

const AppRoot = StackNavigator(
  {
    MainScreen: { screen: DecksNavigator },
    NewDeck: { screen: CreateDeck }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoot
          ref={nav => {
            this.navigator = nav
          }}
        />
      </Provider>
    )
  }
}
