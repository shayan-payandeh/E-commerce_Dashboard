/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'hamburger',
  initialState: {
    sidebarShow: localStorage.getItem('hamburger') ? localStorage.getItem('hamburger') : true,
  },
  reducers: {
    changeState: (hamburger, action) => {
      hamburger.sidebarShow = action.payload.sidebarShow
      localStorage.setItem('hamburger', action.payload.sidebarShow)
    },
  },
})
export const { changeState } = slice.actions
export default slice.reducer
