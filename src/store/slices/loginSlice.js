import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { localHRKey, LOGIN_API, USER_API } from '../../utils/constants'
import { client } from "../../api/client"

// initial state for Login
const initialState = {
    userInfos: [],
    status: 'idle',
    error: null,
    token: null
}

/**
 * @constant fetchLogin
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns the result of the query user
*/
export const fetchLogin = createAsyncThunk(
    'login/fetchLogin', 
    async (datas) => {
        const response = await client(LOGIN_API, 'POST', datas)
        return response.data
    }
)

/**
 * @constant fetchUser 
 * function createAsyncThunk (action type, async function returning a promise)
 * @returns the user infos like firstName and lastName
*/
export const fetchUser = createAsyncThunk(
    'login/fetchUser',
    async(userToken) => {
        const response = await client(USER_API, 'POST', userToken)
        return response.data
    }
)

/**
 * @constant loginSlice
 * function createSlice is a function that accepts : initial state, slice name, reducers functions, 
 * which generate actions creators and actions types - Redux Toolkit
 * extraReducers is used with createAsyncThunk
*/
const loginSlice  = createSlice ({
    name: 'login',
    initialState,
    reducers: {
        logOut(state,action) {
            state.userInfos = []
            state.status = 'idle'
            state.userStatus = 'idle'
            state.token = null
            sessionStorage.removeItem(localHRKey)
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status= 'succeeded'
                if(state.error !== null) state.error = null
                state.token = 'Bearer'.concat(action.payload.body.token)
                sessionStorage.setItem(localHRKey, 'Bearer'.concat(action.payload.body.token))
            })
            .addCase(fetchLogin.rejected, (state,action) => {
                state.status = 'failed'
                action.error.message === "Rejected" ? state.error = "Error : connection server" : state.error = action.error.message
                sessionStorage.removeItem(localHRKey)
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userStatus= 'succeeded'
                if(state.error !== null) state.error = null
                state.userInfos = {
                    email: action.payload.body.email,
                    firstName: action.payload.body.firstName,
                    lastName: action.payload.body.lastName,
                    id: action.payload.body.id
                }
            })  
    }
})

export const { logOut } = loginSlice.actions

export default loginSlice.reducer