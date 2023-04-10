import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import testService from './testService'

const initialState = {
    tests: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get tests
export const getTests = createAsyncThunk('tests/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await testService.getTests(token)
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

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTests.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTests.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tests = action.payload
            })
            .addCase(getTests.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = testSlice.actions
export default testSlice.reducer