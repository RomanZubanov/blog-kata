import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getPostList from '../../services/getPostsList'

export const fetchPostList = createAsyncThunk('postList/fetchPostList', async (_, { getState }) => {
  const { currentPage } = getState().postList
  return getPostList(currentPage)
})

const initialState = {
  posts: [],
  postsCount: 0,
  currentPage: 1,
  status: 'idle',
  error: null,
}

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    pageChange(state, action) {
      state.status = 'idle'
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPostList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload.articles
        state.postsCount = action.payload.articlesCount
      })
      .addCase(fetchPostList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default postListSlice.reducer

export const { pageChange } = postListSlice.actions
