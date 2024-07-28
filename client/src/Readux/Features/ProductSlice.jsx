import { createSlice } from '@reduxjs/toolkit'

export const ProductSlice = createSlice({
    name: 'item',
    initialState: {
        item: []
    },
    reducers: {
        addItem: (state, action) => {
            state.item = action.payload
        },

        addSingleItem: (state, action) => {
            state.item.push(action.payload)
        },

        deleteItem: (state, action) => {
            const itemId = action.payload
            state.item = state.item.filter(item =>item._id !== itemId)
        }
    }
})

export const {addItem, addSingleItem, deleteItem} = ProductSlice.actions
export default ProductSlice.reducer 