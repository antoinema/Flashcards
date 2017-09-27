import { ADD_DECK, ADD_CARD } from '../actions'
import { combineReducers } from 'redux'

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

const testState = {
  title: 'Deck Title',
  questions: []
}

function decks(state = testState, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deckId]: action.deck
      }
    case ADD_CARD:
      return addCard(state, action)
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

const rootReducer = combineReducers({
  decks,
  cards
})

export default rootReducer
