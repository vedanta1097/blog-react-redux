import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '@/lib/types'

interface initialState {
  posts: Post[],
  isLoading: boolean,
  isError: boolean
}

const initialState: initialState = {
  posts: [],
  isLoading: false,
  isError: false,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload
    },
    setisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export const { setPosts, setIsError, setisLoading } = postsSlice.actions

export default postsSlice.reducer