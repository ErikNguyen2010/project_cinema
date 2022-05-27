import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/setting';

const initialState = {
    arrRap : []
}

const layThongTinRapReducer = createSlice({
  name: 'layThongTinRapReducer',
  initialState,
  reducers: {
      getThongTinRapApi : (state, action) =>{
          state.arrRap = action.payload
      }
  }
});

export const {getThongTinRapApi} = layThongTinRapReducer.actions

export default layThongTinRapReducer.reducer



export const getThongTinRap = () =>{
    return async (dispatch) =>{
        try{
            const result = await http.get("/api/QuanLyRap/LayThongTinHeThongRap")
            const action = getThongTinRapApi(result.data.content)
            dispatch(action)
        }catch(error){
            console.log(error.response?.data);
        }
    }
}