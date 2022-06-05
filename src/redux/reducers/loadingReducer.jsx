import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false
}

const loadingReducer = createSlice({
  name: "loadingReducer",
  initialState,
  reducers: {
      loading: (state,action) =>{
          state.isLoading = true
      },
      hideLoading: (state,action) =>{
          state.isLoading = false

      }
  }
});

export const {loading, hideLoading} = loadingReducer.actions

export default loadingReducer.reducer