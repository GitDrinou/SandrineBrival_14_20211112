import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"
import { DEPT_API, EMPLOYEES_API, localHRKey, NEW_EMPLOYEE_API, STATES_API } from "../../utils/constants"

const localKey = localStorage.getItem(localHRKey)

// initial State for Employee
const initialState = {
    statesList: [],
    departmentsList: [],
    employees: [],
    employee_details: [],
    creationStatus: 'idle',
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
 * @constant createEmployee
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns creation of a new employee
*/
export const createEmployee = createAsyncThunk(
    'employee/createEmployee',
    async(datas) => {
        const body = {
            "firstName": datas.firstName,
            "lastName": datas.lastName,
            "birthDate": datas.birthDate,
            "startDate": datas.startDate,
            "street": datas.street,
            "city": datas.city,
            "state": datas.selectedState,
            "zipCode": datas.zipCode,
            "department": datas.selectedDepartment
        }
        const response = await client(NEW_EMPLOYEE_API, 'POST', body, localKey)
        return response.data
    }
)

/**
 * @constant fetchEmployees
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns all employees
*/
export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async() => {
        const response = await client(EMPLOYEES_API, 'GET', '', '')
        return response.data
    }
)

/**
 * @constant fetchEmployee
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns specific employee
*/
export const fetchEmployee = createAsyncThunk(
    'employee/fetchEmployee',
    async(employeeId) => {
        const response = await client(EMPLOYEES_API, 'POST', employeeId, '')
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
            .addCase(createEmployee.pending, (state, action) => {
                state.creationStatus = 'loading'
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.creationStatus = 'succeeded'
                if(state.error !== null) state.error = null
                state.employees = state.employees.concat(action.payload.body)
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.creationStatus = 'rejected'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
            })
            .addCase(fetchEmployees.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if(state.error !== null) state.error = null
                state.employees = action.payload.body
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.sattus = 'rejected'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
            })
            .addCase(fetchEmployee.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if(state.error !== null) state.error = null
                state.employee_details = action.payload.body
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.sattus = 'rejected'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
            })
    }
})


export default employeeSlice.reducer