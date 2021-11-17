import { configureStore } from "@reduxjs/toolkit"
import loginReducer from '../store/slices/loginSlice'

export const store = configureStore({
    reducer:{
        login: loginReducer,
    }
})