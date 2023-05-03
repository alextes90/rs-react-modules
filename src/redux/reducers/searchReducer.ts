import * as toolkitRaw from '@reduxjs/toolkit';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

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
