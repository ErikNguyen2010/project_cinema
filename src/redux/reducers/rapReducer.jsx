import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/setting';

const initialState = {
    arrRap : [],
    thongTinPhimChiTiet: {}
}

const rapReducer = createSlice({
  name: 'rapReducer',
  initialState,
  reducers: {
      getThongTinRapApi : (state, action) =>{
          state.arrRap = action.payload
      },
      getThongTinPhimApi : (state,action) =>{
          state.thongTinPhimChiTiet = action.payload
      }
  }
});

export const {getThongTinRapApi,getThongTinPhimApi} = rapReducer.actions

export default rapReducer.reducer



export const getThongTinRap = () =>{
    return async (dispatch) =>{
        try{
            const result = await http.get("/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP02")
            if(result.status === 200){
                const action = getThongTinRapApi(result.data.content)
                dispatch(action)
            }
        }catch(error){
            console.log(error.response?.data);
        }
    }
}

export const getThongTinPhim = (idPhim) =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${idPhim}`)
            const action = getThongTinPhimApi(result.data.content);
            dispatch(action)
        }  
        catch(error){
            console.log(error.response?.data);
        }
    }
}