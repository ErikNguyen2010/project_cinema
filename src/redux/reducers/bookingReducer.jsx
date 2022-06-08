import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../util/setting';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { hideLoading, loading } from './loadingReducer';

const initialState = {
    danhSachPhongVe:{},
    arrDatVe:[],
    tab: "1",
}

const bookingReducer = createSlice({
  name: 'bookingReducer',
  initialState,
  reducers: {
      getDanhSachPhongVeAPI: (state,action) =>{
          state.danhSachPhongVe = action.payload
      },
      datVe : (state,action) =>{
          let indexGhe = state.arrDatVe.findIndex(soGhe => soGhe.maGhe == action.payload.maGhe)
          if(indexGhe !== -1){
              state.arrDatVe.splice(indexGhe, 1)
            }else{
                state.arrDatVe.push(action.payload)
            }
      },
    //  Đặt vé thành công sau đó gọi lại API để reload lại phần thông tin vé
      datVeHoanTat: (state,action) =>{
          state.arrDatVe = []
      },
      // CHuyển qua tab 2 sau khi đặt vé xong
      chuyenTab: (state,action) =>{
          state.tab = "2"
      },
      chuyenTabActive: (state,action) =>{
          state.tab = action.payload
      }
  }
});

export const {getDanhSachPhongVeAPI, datVe, datVeHoanTat,chuyenTab, chuyenTabActive} = bookingReducer.actions

export default bookingReducer.reducer

export const getDanhSachPhongVe = (maLichChieu) =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
            const action = getDanhSachPhongVeAPI(result.data.content)
            dispatch(action)
        }
        catch(error){
            console.log(error.response?.data);
        }
    }
}


export const datGheAPI = (thongTinDatVe = new ThongTinDatVe()) =>{
    return async dispatch =>{
        try{
            let result = await http.post("/api/QuanLyDatVe/DatVe", thongTinDatVe)
            await alert("ĐẶT VÉ THÀNH CÔNG!")
            await dispatch(loading())
            //  Đặt vé thành công sau đó gọi lại API để reload lại phòng vé
            await dispatch(getDanhSachPhongVe(thongTinDatVe.maLichChieu))
            //  Đặt vé thành công sau đó gọi lại API để reload lại phần thông tin vé
            await dispatch(datVeHoanTat())
            dispatch(hideLoading())
            dispatch(chuyenTab())
        }   
        catch(error){
            dispatch(hideLoading())
            console.log(error.response);
        }
    }
}