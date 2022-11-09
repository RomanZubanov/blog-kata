import { configureStore } from '@reduxjs/toolkit'

import postListReducer from './components/PostList/postListSlice'

export default configureStore({
  reducer: {
    postList: postListReducer,
  },
})
