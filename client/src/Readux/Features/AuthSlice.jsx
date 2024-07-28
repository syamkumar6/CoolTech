import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
    name: 'user',
    initialState: {
        auth: false,
        userData: null
    },
    reducers: {
        addAuth: (state, action) => {
            state.auth = action.payload
        },

        addUser: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const {addAuth, addUser} = AuthSlice.actions
export default AuthSlice.reducer 