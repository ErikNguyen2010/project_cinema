import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../util/setting';
const initialState = {
    films: []
}

const layDanhSachFilmReducer = createSlice({
  name: "layDanhSachFilmReducer",
  initialState,
  reducers: {
      getListFilmApi: (state,action) =>{
          state.films = action.payload
      }
  }
});

export const {getListFilmApi} = layDanhSachFilmReducer.actions

export default layDanhSachFilmReducer.reducer


export const getFilms= () =>{
    return async (dispatch) =>{
    try{
        const result = await http.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
        const action = getListFilmApi(result.data.content)
        dispatch(action)
    }catch(error){
        console.log(error.response?.data);
    }
 }
} 