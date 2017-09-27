export const getAllDecks = state => {
  return state.decks
}

export const getCardForUser = (state, deckId) => {
  return state.decks[deckId].cards.map(id => state.cards[id])
}
