import { configureStore } from '@reduxjs/toolkit'

import postListReducer from './components/PostList/postListSlice'
import userReducer from './components/Forms/userSlice'

export default configureStore({
  reducer: {
    postList: postListReducer,
    user: userReducer,
  },
})
