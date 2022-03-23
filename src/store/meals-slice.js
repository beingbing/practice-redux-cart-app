import { createSlice } from '@reduxjs/toolkit';

const mealsSlice = createSlice({
  name: 'meals',
  initialState: { meals: [] },
  reducers: {
    addMealsList(state, action) {
      state.meals = action.payload;
    }
  },
});

export const mealsActions = mealsSlice.actions;

export default mealsSlice;
