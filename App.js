import React from 'react'
import Decks from './components/Decks'

import Deck from './components/Deck'
import CreateDeck from './components/CreateDeck'

import persistStore from './store'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Loading from './components/Loading'
import CreateCard from './components/CreateCard'
import Quiz from './components/Quiz'

const DeckDetail = StackNavigator(
  {
    Deck: { screen: Deck },
    NewCard: { screen: CreateCard }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
)

const DecksNavigator = StackNavigator(
  {
    Home: { screen: Decks },
    Deck: { screen: DeckDetail },
    Quiz: { screen: Quiz }
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
      <Provider store={persistStore.store}>
        <PersistGate persistor={persistStore.persistor} loading={<Loading />}>
          <AppRoot
            ref={nav => {
              this.navigator = nav
            }}
          />
        </PersistGate>
      </Provider>
    )
  }
}
