export const getAllDecks = state => {
  return state.allDecksId.map(id => ({ key: id, ...state.decks[id] }))
}
export const getCardsForDeck = (state, deckId) => {
  return state.decks[deckId].cards.map(id => ({ key: id, ...state.cards[id] }))
}

export const getDeck = (state, deckId) => {
  return state.decks[deckId]
}

export const getScore = state => {
  const scores = Object.keys(state.score).map(key => state.score[key])
  return {
    questionsNumber: scores.length,
    correct: scores.filter(i => i === true).length
  }
}

export const getNotificationStatus = state => {
  return state.notification
}
