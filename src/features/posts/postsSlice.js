import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getPostList from '../../services/getPostsList'

export const fetchPostsList = createAsyncThunk('postsList/fetchPostsList', async (token, { getState }) => {
  const { currentPage } = getState().postsList
  return getPostList(token, currentPage)
})

const postsListSlice = createSlice({
  name: 'postsList',
  initialState: {
    posts: [],
    postsCount: 0,
    currentPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {
    pageChange(state, action) {
      state.status = 'idle'
      state.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPostsList.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPostsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = action.payload.articles
        state.postsCount = action.payload.articlesCount
      })
      .addCase(fetchPostsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { pageChange } = postsListSlice.actions

export default postsListSlice.reducer
