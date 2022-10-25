import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../features/auth/authSlice'
import voteReducer from '../features/home/voteSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    vote: voteReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
//  devTools: false

setupListeners(store.dispatch)