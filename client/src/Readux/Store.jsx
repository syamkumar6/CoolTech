import { configureStore } from '@reduxjs/toolkit';
import productReducer from './Features/ProductSlice';
import usersReducer from './Features/UsersSlice'
import authReducer from './Features/AuthSlice'
import stocksReducer from './Features/StockSlice'
import historyReducer from './Features/HistorySlice'
import {thunk} from 'redux-thunk';
import {logger} from 'redux-logger'; // Example additional middleware

export default configureStore({
  reducer: {
    items: productReducer,
    users: usersReducer,
    authData : authReducer,
    stocksData: stocksReducer,
    historyData: historyReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
});
