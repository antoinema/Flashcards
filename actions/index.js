export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD = 'ADD_CARD'
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
