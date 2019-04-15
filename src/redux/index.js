import R from 'ramda'
import { AsyncStorage } from 'react-native'
import { all, call } from 'redux-saga/effects'
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'

import feedReducer, { feedSagas } from './feed'

const rootReducer = combineReducers({
  feed: feedReducer,
})

function* rootSaga() {
  yield all([call(feedSagas)])
}

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  timeout: 0,
  // whitelist: ['feed'],
}

// purgeStoredState(persistConfig)

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const rootPersistReducer = persistReducer(persistConfig, rootReducer)

  const middlewares = R.filter(R.complement(R.isNil), [
    sagaMiddleware,
    __DEV__ ? createLogger({ collapsed: true }) : null,
  ])

  const store = createStore(rootPersistReducer, applyMiddleware(...middlewares))

  const persistor = persistStore(store, null, () => {
    store.getState()
  })

  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}
