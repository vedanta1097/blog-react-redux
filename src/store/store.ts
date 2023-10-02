import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '@/store/postsSlice'

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store