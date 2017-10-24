import { NEW_DECK, ADD_CARD, RESET_SCORE, SUBMIT_ANSWER } from '../actions'
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

function decks(state = {}, action) {
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

function allDecksId(state = [], action) {
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

function cards(state = {}, action) {
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

const rootReducer = combineReducers({
  decks,
  cards,
  allDecksId,
  score
})

const config = {
  version: '1',
  key: 'primary',
  storage: AsyncStorage,
  debug: true
}

export default persistReducer(config, rootReducer)
