/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'categories',
  initialState: {
    list: localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [],
    loading: false,
  },
  reducers: {
    categoriesRequested: (categories, action) => {
      categories.loading = true
    },
    categoriesRequestedFailed: (categories, action) => {
      categories.loading = false
    },
    categoriesReceived: (categories, action) => {
      categories.loading = false
      categories.list = action.payload
      localStorage.setItem('categories', JSON.parse([...action.payload]))
    },
    categoryAdded: (categories, action) => {
      categories.list.push(action.payload)
      //update localStorage
    },
    categoryDeleted: (categories, action) => {
      categories.list.filter((item) => item._id !== action.payload._id)
      //update localStorage
    },
    categoryUpdated: (categories, action) => {
      const index = categories.list.findIndex((item) => item._id === action.payload._id)
      categories.list[index] = action.payload
      //update localStorage
    },
  },
})

export default slice.reducer
