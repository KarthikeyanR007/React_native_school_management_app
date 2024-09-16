/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  class: '', // Initial state for className
};

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setClass: (state, action) => {
      state.class = action.payload; // Update the className in state
    },
    clearClass: state => {
      state.class = ''; // Clear the className in state
    },
  },
});

// Action creators are generated for each case reducer function
export const {setClass, clearClass} = classSlice.actions;

export default classSlice.reducer;
