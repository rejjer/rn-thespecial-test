import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import Feed from './screens/Feed'
import { configureStore } from './redux'
import './api'

const { store, persistor } = configureStore()

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
      <Feed />
    </PersistGate>
  </Provider>
)

export default App
