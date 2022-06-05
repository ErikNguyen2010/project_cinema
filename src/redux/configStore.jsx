import {applyMiddleware, configureStore, createStore} from '@reduxjs/toolkit'
import layBannerReducer from './reducers/layBannerReducer'
import layDanhSachFilmReducer from './reducers/layDanhSachFilmReducer'
import rapReducer from './reducers/rapReducer'
import userReducer from './reducers/userReducer'
import loadingReducer from './reducers/loadingReducer'
import bookingReducer from './reducers/bookingReducer'
export const store = configureStore({
    reducer:{
        layDanhSachFilmReducer,
        layBannerReducer,
        rapReducer,
        userReducer,
        loadingReducer,
        bookingReducer,
    }
})

