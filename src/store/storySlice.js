import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStory: null,
  savedStories: [],
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
    },
    saveStory: (state, action) => {
      state.savedStories.push(action.payload);
    },
  },
});

export const { setCurrentStory, saveStory } = storySlice.actions;

export default storySlice.reducer;