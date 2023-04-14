import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'api',
  initialState: {
    value: '',
  },
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setValue } = searchSlice.actions;
