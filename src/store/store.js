import { configureStore } from "@reduxjs/toolkit"
import loginReducer from '../store/slices/loginSlice'
import employeeReducer from '../store/slices/employeeSlice'

export const store = configureStore({
    reducer:{
        login: loginReducer,
        employee: employeeReducer,
    }
})