/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import classReducer  from './classSlice';

const store = configureStore({
  reducer: {
    // Add reducers here
    user: userReducer,
    class: classReducer,
  },
});

export default store;
