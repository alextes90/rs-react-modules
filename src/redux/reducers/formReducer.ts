import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Card } from '../../interfaces/interfaces';

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
