import { configureStore } from '@reduxjs/toolkit';
import storyReducer from './storySlice';

export const store = configureStore({
  reducer: {
    story: storyReducer,
  },
});