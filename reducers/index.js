import {
  NEW_DECK,
  ADD_CARD,
  RESET_SCORE,
  SUBMIT_ANSWER,
  RESET_NOTIFICATION,
  SET_NOTIFICATION
} from '../actions'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

/* {
  deckKey: {
    title:,
    questions: [1, 2, 3]
  }
} */

/* 
questionsById: {
  1: {
    question: 'What is React?',
    answer: 'A library for managing user interfaces'
  },
  2:       {
    question: 'Where do you make Ajax requests in React?',
    answer: 'The componentDidMount lifecycle event'
  }
}
  */

const defaultDecks = {
  '0': { title: 'Planes', id: '0', cards: ['0', '1', '5'] },
  '1': { title: 'Cars', id: '1', cards: ['2', '3'] },
  '2': { title: 'Trains', id: '2', cards: ['4'] }
}

const defaultAllDecksId = [0, 1, 2]

const defaultCards = {
  '0': {
    question: 'What Is the Altitude of a Jet Engine Plane in Flight?',
    answer: '39,000 feet',
    id: '0'
  },
  '1': {
    question: 'What Is the Speed of a Plane?',
    answer: '500 Knots',
    id: '1'
  },
  '2': {
    question: 'What Is the Fastest Car You Can Buy New Today?',
    answer: 'The Hennessey Venom F5 (301 mph)',
    id: '2'
  },
  '3': {
    question: 'What Is the Most Succesful Car Ever?',
    answer: 'THe Toyota Corolla which sold more than 40,000,000 units',
    id: '3'
  },
  '4': {
    question: 'Where has the First Train Run?',
    answer:
      'On 21 February 1804, the world\'s first steam-powered railway journey in the world took place when Trevithick\'s unnamed steam locomotive hauled a train along the tramway of the Penydarren ironworks, near Merthyr Tydfil in South Wales',
    id: '3'
  },
  '5': {
    question: 'How fast was the Concord?',
    answer: '1,354 mph',
    id: '5'
  }
}

function decks(state = defaultDecks, action) {
  switch (action.type) {
    case NEW_DECK:
      return {
        ...state,
        [action.deckId]: { ...action.deck, cards: [] }
      }
    case ADD_CARD:
      return addCard(state, action)
    default:
      return state
  }
}

function allDecksId(state = defaultAllDecksId, action) {
  switch (action.type) {
    case NEW_DECK:
      return state.concat(action.deckId)
    default:
      return state
  }
}

function addCard(state, action) {
  const { deckId, cardId } = action
  const deck = state[deckId]
  return {
    ...state,
    [deckId]: {
      ...deck,
      cards: deck.cards.concat(cardId)
    }
  }
}

function cards(state = defaultCards, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.cardId]: action.card
      }
    default:
      return state
  }
}

function score(state = {}, action) {
  switch (action.type) {
    case SUBMIT_ANSWER:
      return {
        ...state,
        [action.cardId]: action.correct
      }
    case RESET_SCORE:
      return {}
    default:
      return state
  }
}

function notification(state = null, action) {
  switch (action.type) {
    case RESET_NOTIFICATION:
      return null
    case SET_NOTIFICATION:
      return true
    default:
      return state
  }
}

const rootReducer = combineReducers({
  decks,
  cards,
  allDecksId,
  score,
  notification
})

const config = {
  version: '1',
  key: 'primary',
  storage: AsyncStorage,
  debug: true,
  blacklist: ['score']
}

export default persistReducer(config, rootReducer)
