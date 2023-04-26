import { PayloadAction } from '@reduxjs/toolkit';
import * as toolkitRaw from '@reduxjs/toolkit';
import { Card } from '../../interfaces/interfaces';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ??
  toolkitRaw) as typeof toolkitRaw;

interface FormResult {
  formResult: Card[];
}

const initialState: FormResult = {
  formResult: [],
};

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    setFormResult(state, action: PayloadAction<Card>) {
      state.formResult.push(action.payload);
    },
  },
});

export const { setFormResult } = formSlice.actions;
export default formSlice.reducer;
