import { configureStore } from '@reduxjs/toolkit'
import SliceReducer from "../slice/Slice"
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger'


const persistConfig = {
  key: 'root',
  storage : AsyncStorage,
  whitelist: [
    'extraReducer',
  ],
} 

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })
const persistedReducer = persistReducer(persistConfig, SliceReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)