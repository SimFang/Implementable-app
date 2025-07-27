import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalysisState {
  data: any[];
  state : string; 
  error: string | null;
}

const initialState: AnalysisState = {
  data: [],
  state : "unactive",
  error: null,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setState : (state, action : PayloadAction<string>) => {
      state.state = action.payload;
    },
    clearData: (state) => {
      state.data = [];
      state.error = null;
      state.state = "unactive"
    },
  },
});

export const { setData, setError, setState, clearData } = analysisSlice.actions;
export default analysisSlice.reducer;