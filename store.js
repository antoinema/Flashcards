import { createStore } from 'redux'
import rootReducer from './reducers'
import devToolsEnhancer from 'remote-redux-devtools'
//import { persistStore } from 'redux-persist'

const store = createStore(rootReducer, devToolsEnhancer())
//const persistor = persistStore(store)
//export default { store, persistor }
export default store
