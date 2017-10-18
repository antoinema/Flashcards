export const getAllDecks = state => {
  return state.allDecksId.map(id => ({ key: id, ...state.decks[id] }))
}
export const getCardForDeck = (state, deckId) => {
  return state.decks[deckId].cards.map(id => state.cards[id])
}

export const getDeck = (state, deckId) => {
  console.log('deckId')
  console.log(deckId)
  return state.decks[deckId]
}
