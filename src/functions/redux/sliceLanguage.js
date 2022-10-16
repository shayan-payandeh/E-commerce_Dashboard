/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'language',
  initialState: {
    language: localStorage.getItem('language') ? localStorage.getItem('language') : 'english',
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload.language
      localStorage.setItem('language', action.payload.language)
    },
  },
})

export const { changeLanguage } = slice.actions
export default slice.reducer
