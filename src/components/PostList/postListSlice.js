import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import getPostList from '../../services/getPostsList'
import serviceArticle from '../../services/serviceArticle'

export const fetchPostList = createAsyncThunk('postList/fetchPostList', async (_, { getState }) => {
  const { currentPage } = getState().postList
  return getPostList(currentPage)
})

export const fetchArticle = createAsyncThunk('postList/fetchArticle', async (dataForm) => serviceArticle(dataForm))

const initialState = {
  posts: [],
  postsCount: 0,
  currentPage: 1,
  article: {
    status: 'idle',
    article: null,
    error: null,
  },
  slug: null,
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
      .addCase(fetchArticle.pending, (state) => {
        state.article.status = 'loading'
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.article = {
          status: 'succeeded',
          article: action.payload.article,
        }
        state.slug = action.payload.article.slug
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.article.status = 'failed'
        state.article.error = action.error.message
      })
  },
})

export default postListSlice.reducer

export const { pageChange } = postListSlice.actions
