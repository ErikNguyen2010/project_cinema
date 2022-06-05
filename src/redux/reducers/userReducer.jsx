import { createSlice } from '@reduxjs/toolkit'
import { ACCESSTOKEN, http, USER_LOGIN } from '../../util/setting';
import { history } from '../../App';

let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin: user,
    userRegister: {},
    thongTinNguoiDung: {},
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
      getThongTinAPI:(state,action) =>{
          state.thongTinNguoiDung = action.payload
      }
  }
});

export const {registerAPI, loginAPI, getThongTinAPI} = userReducer.actions

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
            alert("Đăng nhập thành công")
            history.goBack()


        }catch(error){
            console.log(error.response?.data);
            alert(`${error.response.data.content}`)
        }
    }
}

export const getThongTinNguoiDungAPI = () =>{
    return async dispatch =>{
        try{
            let result = await http.post ("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
            const action = getThongTinAPI(result.data.content)
            dispatch(action)
        }catch(error){
            console.log(error.response?.data);
        }
    }
}