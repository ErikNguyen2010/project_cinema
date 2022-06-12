import { createSlice } from '@reduxjs/toolkit'
import { ACCESSTOKEN, GROUP_ID, http, USER_LOGIN } from '../../util/setting';
import { history } from '../../App';

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    userRegister: {},
    thongTinTaiKhoan: {},
    danhSachNguoiDung:[],
    loaiNguoiDung: [],
    thongTinNguoiDung : {},

}

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
      registerAPI: (state, action) =>{
          state.userRegister = action.payload
      },
      loginAPI : (state, action) =>{
          state.userLogin = action.payload
      },
      getThongTinTaiKhoan:(state,action) =>{
          state.thongTinTaiKhoan = action.payload
      },
      getDanhSachNguoiDung: (state,action) =>{
        state.danhSachNguoiDung = action.payload
      },
      getLoaiNguoiDung: (state,action) =>{
        state.loaiNguoiDung = action.payload
      },
      getThongTinNguoiDung: (state, action) =>{
        state.thongTinNguoiDung = action.payload
      }
  }
});

export const {registerAPI, loginAPI, getThongTinTaiKhoan,getDanhSachNguoiDung,getLoaiNguoiDung, getThongTinNguoiDung} = userReducer.actions

export default userReducer.reducer

export const userRegisterAPI = (userRegister) =>{
    return async dispatch =>{
        try{
            const result = await http.post("/api/QuanLyNguoiDung/DangKy", userRegister)
            console.log(result);
            const action = registerAPI(result.data.content)
            dispatch(action)
            alert("Đăng ký thành công");
            history.push('/login')
        }catch(error){
            console.log(error.response?.data);
            alert(`${error.response.data.content}`)
        }
    }
}

export const userLoginAPI = (userLogin) =>{
    return async dispatch =>{
        try{
            const result = await http.post("/api/QuanLyNguoiDung/DangNhap", userLogin)
            let usLogin = result.data.content
            localStorage.setItem(USER_LOGIN,JSON.stringify( usLogin))
            localStorage.setItem(ACCESSTOKEN, usLogin.accessToken)
            const action = loginAPI(usLogin)
            dispatch(action)
            await alert("Đăng nhập thành công")
            await history.goBack()


        }catch(error){
            console.log(error.response?.data);
            alert(`${error.response.data.content}`)
        }
    }
}

export const getThongTinTaiKhoanAPI = () =>{
    return async dispatch =>{
        try{
            let result = await http.post ("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
            const action = getThongTinTaiKhoan(result.data.content)
            dispatch(action)
        }catch(error){
            console.log(error.response?.data);
        }
    }
}

export const getDanhSachNguoiDungAPI = (tuKhoa = "") =>{
    return async dispatch =>{
        try{
            if(tuKhoa.toLowerCase().trim() !== ""){
                let result = await http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`)
                const action = getDanhSachNguoiDung(result.data.content)
                dispatch(action)
            }
            else{
                let result = await http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`)
                const action = getDanhSachNguoiDung(result.data.content)
                dispatch(action)
            }
        }
        catch(error){
            console.log(error.response?.data);
        }
    }
}


export const xoaNguoiDung = (taiKhoan) =>{
    return async dispatch =>{
        try{
            if(window.confirm("Bạn có muốn xóa người dùng này không?")){
                let result = await http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
                dispatch(getDanhSachNguoiDungAPI())
            }   

        }
        catch(error){
            console.log(error.response?.data);
        }
    }
}

export const layDanhSachLoaiNguoiDung = () =>{
    return async dispatch =>{
        try{
            let result = await http.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
            dispatch(getLoaiNguoiDung(result.data.content))
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}

export const themNguoiDung = (thongTinNguoiDung) =>{
    return async dispatch =>{
        try{
            let result = await http.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung)
            alert("Thêm người dùng thành công")
            history.push('/admin/users')
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}

export const layThongTinNguoiDung = (taiKhoan) =>{
    return async dispatch =>{
        try{
            let result = await http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
            const action = getThongTinNguoiDung(result.data.content)
            dispatch(action)
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}

export const editNguoiDung = (thongTin) =>{
    return async dispatch =>{
        try{
            let result = await http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTin)
            alert("Edit thành công!")
            history.push('/admin/users')
        }
        catch(err){
            console.log(err.response?.data);
        }
    }
}