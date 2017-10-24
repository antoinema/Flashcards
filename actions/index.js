export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER'
export const RESET_SCORE = 'RESET_SCORE'

import { v1 as uuidv4 } from 'uuid'

export function addNewDeck(deck) {
  const id = uuidv4()
  return {
    type: NEW_DECK,
    deck: {
      ...deck,
      id
    },
    deckId: id
  }
}

export function addNewCard(card, deckId) {
  const id = uuidv4()
  return {
    type: ADD_CARD,
    card: {
      ...card,
      id
    },
    cardId: id,
    deckId: deckId
  }
}

export function submitAnswer(cardId, correct) {
  return {
    type: SUBMIT_ANSWER,
    cardId,
    correct
  }
}

export function resetScore() {
  return {
    type: RESET_SCORE
  }
}
