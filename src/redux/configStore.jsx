import {applyMiddleware, configureStore, createStore} from '@reduxjs/toolkit'
import layDanhSachFilmReducer from './reducers/layDanhSachFilmReducer'
import rapReducer from './reducers/rapReducer'
import userReducer from './reducers/userReducer'
import loadingReducer from './reducers/loadingReducer'
import bookingReducer from './reducers/bookingReducer'
export const store = configureStore({
    reducer:{
        layDanhSachFilmReducer,
        rapReducer,
        userReducer,
        loadingReducer,
        bookingReducer,
    }
})

