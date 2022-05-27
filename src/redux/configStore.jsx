import {applyMiddleware, configureStore, createStore} from '@reduxjs/toolkit'
import layBannerReducer from './reducers/layBannerReducer'
import layDanhSachFilmReducer from './reducers/layDanhSachFilmReducer'
import layThongTinRapReducer from './reducers/layThongTinRapReducer'
export const store = configureStore({
    reducer:{
        layDanhSachFilmReducer,
        layBannerReducer,
        layThongTinRapReducer,
    }
})

