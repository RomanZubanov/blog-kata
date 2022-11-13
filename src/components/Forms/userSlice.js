import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import serviceUser from '../../services/serviceUser'

export const fetchServiceUser = createAsyncThunk('user/fetchServiceUser', async (dataForm) => serviceUser(dataForm))

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoggedIn: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    getUserLocal(state, action) {
      if (action.payload.user.token) {
        state.user = action.payload.user
        state.isLoggedIn = true
      }
    },
    logOut(state) {
      state.isLoggedIn = false
      state.user = {}
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchServiceUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchServiceUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isLoggedIn = true
        state.user = action.payload.user
        state.error = null
      })
      .addCase(fetchServiceUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { getUserLocal, logOut } = userSlice.actions

export default userSlice.reducer
