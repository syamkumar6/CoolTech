import { createSlice } from '@reduxjs/toolkit'

export const HistorytSlice = createSlice({
    name: 'history',
    initialState: {
        historys: []
    },
    reducers: {
        addHistory: (state, action) => {
            state.historys = action.payload
        },

        addSingleHistory: (state, action) => {
            state.historys.push(action.payload)
        }
    }
})

export const {addHistory, addSingleHistory} = HistorytSlice.actions
export default HistorytSlice.reducer 