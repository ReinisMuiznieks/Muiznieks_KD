import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import typeService from './typeService'

const initialState = {
    types: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get types
export const getTypes = createAsyncThunk('types/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await typeService.getTypes(token)
    } catch(error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTypes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTypes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.types = action.payload
            })
            .addCase(getTypes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = typeSlice.actions
export default typeSlice.reducer