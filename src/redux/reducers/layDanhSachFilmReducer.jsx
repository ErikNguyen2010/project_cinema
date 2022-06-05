import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { http } from '../../util/setting';
const initialState = {
    films: [],
    dangChieu: true,
    sapChieu: true,
    //tạo 1 mảng để backup cho phim dang chieu và sắp chiếu, filter trên mảng này
    arrFilmDefault: [],

}

const layDanhSachFilmReducer = createSlice({
  name: "layDanhSachFilmReducer",
  initialState,
  reducers: {
      getListFilmApi: (state,action) =>{
          state.films = action.payload
          state.arrFilmDefault = state.films
      },
      getFilmsSapChieu: (state,action) =>{
          state.sapChieu = !state.sapChieu
          state.films = state.arrFilmDefault.filter(film => film.sapChieu === true)
      },
      getFilmsDangChieu: (state,action) =>{
          state.dangChieu = !state.dangChieu
          state.films = state.arrFilmDefault.filter(film => film.dangChieu === true)
      }
  }
});

export const {getListFilmApi,getFilmsSapChieu, getFilmsDangChieu} = layDanhSachFilmReducer.actions

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