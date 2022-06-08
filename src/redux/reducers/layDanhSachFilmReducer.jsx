import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { history } from '../../App';
import { http, USER_LOGIN } from '../../util/setting';
const initialState = {
    films: [],
    dangChieu: true,
    sapChieu: true,
    //tạo 1 mảng để backup cho phim dang chieu và sắp chiếu, filter trên mảng này
    arrFilmDefault: [],
    banners: [],
    thongTinPhim: {},

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
      },
      getBannerApi :(state,action) =>{
        state.banners = action.payload
      },
      layThongTinPhim :(state,action) =>{
          state.thongTinPhim = action.payload
      }
  }
});

export const {getBannerApi ,getListFilmApi,getFilmsSapChieu, getFilmsDangChieu, layThongTinPhim} = layDanhSachFilmReducer.actions

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

export const themPhim = (formData) =>{
    return async dispatch =>{
        try{
            let result = await http.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData)
            await alert("Thêm phim thành công")
            await history.push("/admin/films")
        }
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const layThongTinPhimAPI = (maPhim) =>{
    return async dispatch =>{
        try{
            let result = await http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
            const action = layThongTinPhim(result.data.content)
            dispatch(action)
        }catch(error){
            console.log(error.response?.data);
        }
    }
}


export const xoaPhimAPI = (maPhim) =>{
    return async dispatch =>{
        try{
                if(window.confirm("Bạn có muốn xóa không")){
                let result = await http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
                    await dispatch(getFilms())
                }
        }
        catch(error){
            console.log(error.response?.data);
        }
    }

}

export const editPhimAPI = (formData) =>{
    return async dispatch =>{
        try{
            let result = await http.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
            await alert("Chỉnh sửa phim thành công")
            await history.push("/admin/films")
        }
        catch(error){
            console.log(error.response?.data);
        }
    }
}