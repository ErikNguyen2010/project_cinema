import { createSlice } from '@reduxjs/toolkit'
import { GROUP_ID, http } from '../../util/setting';

const initialState = {
    arrRap : [],
    thongTinPhimChiTiet: {},
    heThongRap: [],
    cumRap: []
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
      },
      getHeThongRap : (state,action) =>{
        state.heThongRap = action.payload
      },
      getCumRap: (state,action) =>{
        state.cumRap = action.payload
      }
  }
});

export const {getCumRap ,getThongTinRapApi,getThongTinPhimApi,getHeThongRap} = rapReducer.actions

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

export const getThongTinHeThongRap = () =>{
    return async (dispatch) =>{
        try{
            let result = await http.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
            const action =   getHeThongRap(result.data.content)          
            dispatch(action)
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
} 


export const getThongTinCumRap = (maHeThongRap) =>{
    return async (dispatch) =>{
        try{
            let result = await http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
            const action = getCumRap(result.data.content)
            dispatch(action)
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}