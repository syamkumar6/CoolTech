import { createSlice } from '@reduxjs/toolkit'

export const UsersSlice = createSlice({
    name: 'usersList',
    initialState: {
        usersList: []
    },
    reducers: {
        addUsers: (state, action) => {
            state.usersList = action.payload
        },

        addSingleUser: (state, action) => {
            state.usersList.push(action.payload)
        },

        deleteUser: (state, action) => {
            const userId = action.payload
            state.usersList = state.usersList.filter(user =>user._id !== userId)
        }
    }
})

export const {addUsers, addSingleUser, deleteUser} = UsersSlice.actions
export default UsersSlice.reducer 