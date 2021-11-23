import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { DEPT_API, STATES_API } from "../../utils/constants"

// initial State for Employee
const initialState = {
    statesList: [],
    departmentsList: [],
    employees: [],
    status: 'idle',
    error: null,
    token: null
}

/**
 * @constant fetchStates 
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns the states
*/
export const fetchStates = createAsyncThunk(
    'employee/fetchStates',
    async() => {
        const response = await client(STATES_API, 'GET', '', '')
        return response.data
    }
)

/**
 * @constant fetchDepartments
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns the departments
*/
export const fetchDepartments = createAsyncThunk(
    'employee/fetchDepartments',
    async() => {
        const response = await client(DEPT_API, 'GET', '', '')
        return response.data
    }
)

/**
 * @constant employeeSlice
 * function createSlice is a function that accepts : initial state, slice name, reducers functions, 
 * which generate actions creators and actions types - Redux Toolkit
 * extraReducers is used with createAsyncThunk
*/
const employeeSlice = createSlice ({
    name: 'employee',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(fetchStates.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if(state.error !== null) state.error = null
                state.statesList = action.payload.body
            })
            .addCase(fetchStates.rejected, (state, action) => {
                state.sattus = 'rejected'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
            })
            .addCase(fetchDepartments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if(state.error !== null) state.error = null
                state.departmentsList = action.payload.body
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.sattus = 'rejected'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
            })
    }
})


export default employeeSlice.reducer