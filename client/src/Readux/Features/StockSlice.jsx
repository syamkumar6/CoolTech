import { createSlice } from '@reduxjs/toolkit'

export const StockSlice = createSlice({
    name: 'stock',
    initialState: {
        stocks: []
    },
    reducers: {
        addStocks: (state, action) => {
            state.stocks = action.payload
        },

        addSingleStock: (state, action) => {
            state.stocks.push(action.payload)
        },
        updateStock: (state, action) => {
            const updatedItem = action.payload
            const index = state.stocks.findIndex(stock => stock._id === updatedItem._id)
      
            if (index !== -1) {
              state.stocks[index] = {
                ...state.stocks[index],
                ...updatedItem // Merging old and new data
              }
            } else {
              console.error('Item not found')
            }
          },

        deleteStock: (state, action) => {
            const itemId = action.payload
            state.stocks = state.stocks.filter(item =>item._id !== itemId)
        }
    }
})

export const {addStocks, addSingleStock, deleteStock, updateStock} = StockSlice.actions
export default StockSlice.reducer 