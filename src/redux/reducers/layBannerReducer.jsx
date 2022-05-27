import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/setting';

const initialState = {
    banners: []
}

const layBannerReducer = createSlice({
  name: "layBannerReducer",
  initialState,
  reducers: {
      getBannerApi :(state,action) =>{
        state.banners = action.payload
      }
  }
});

export const {getBannerApi} = layBannerReducer.actions

export default layBannerReducer.reducer

export const getBanner = () =>{
    return async (dispatch) =>{
        try{
            const result = await http.get('/api/QuanLyPhim/LayDanhSachBanner');
            const action = getBannerApi(result.data.content)
            dispatch(action)
        }catch(error){
            console.log(error.response?.data);
        }
    }
}