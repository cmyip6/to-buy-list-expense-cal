import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserListState {
    username: string
    userID: number
}

export interface AuthState {
    username: string | undefined,
    isLoggedIn: boolean,
    userList: UserListState[] | undefined
}

const initialState: AuthState = {
    username: undefined,
    isLoggedIn: false,
    userList: []
}

const login: CaseReducer<AuthState, PayloadAction<{ username: string }>> =
    (state, action) => {
        state.username = action.payload.username
        state.isLoggedIn = true
    }

const logout: CaseReducer<AuthState> =
    (state) => {
        state.username = undefined 
        state.isLoggedIn = false
    }

const loginFailed: CaseReducer<AuthState> =
    (state) => {
        state.username = undefined
        state.isLoggedIn = false
    }
const getUserList: CaseReducer<AuthState, PayloadAction<UserListState[]>> =
    (state, action) => {
        state.userList = action.payload
    }


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login,
        logout,
        loginFailed,
        getUserList,
    },
})

export const {
    login: loginAction,
    logout: logoutAction,
    loginFailed: loginFailedAction,
    getUserList: getUserListAction,

} = authSlice.actions

export default authSlice.reducer