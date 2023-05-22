import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/category/categorySlice'
import cardReducer from '../features/card/cardSlice'
import testReducer from '../features/test/testSlice'
import questionReducer from '../features/question/questionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    cards: cardReducer,
    tests: testReducer,
    questions: questionReducer,
  },
})