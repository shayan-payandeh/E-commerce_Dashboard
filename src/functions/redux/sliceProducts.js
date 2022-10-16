/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { productsUrl } from 'src/api'
import { apiCallBegan } from './apiActions'
import { createSelector } from 'reselect'

const slice = createSlice({
  name: 'products',

  initialState: {
    list: localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [],
    loading: false,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true
    },

    productsRequestFailed: (products, action) => {
      products.loading = false
    },

    productsReceived: (products, action) => {
      products.list = action.payload
      products.loading = false
      const pros = [...action.payload]
      localStorage.setItem('products', JSON.stringify(pros))
    },

    productAdded: (products, action) => {
      products.list.push(action.payload)
      const pros = [...products.list, action.payload]
      localStorage.setItem('products', JSON.stringify(pros))
    },

    // productUpdated: (products, action) => {
    //   const index = products.list.findIndex((product) => product._id === action.payload._id)
    //   products.list[index] = action.payload
    // },

    productDeleted: (products, action) => {
      const x = products.list.filter((product) => product._id !== action.payload._id)
      localStorage.setItem('products', JSON.stringify(x))
    },
  },
})
const {
  productsRequested,
  productsRequestFailed,
  productsReceived,
  productAdded,
  productUpdated,
  productDeleted,
} = slice.actions

export default slice.reducer

export const loadProducts = () =>
  apiCallBegan({
    url: productsUrl,
    onStart: productsRequested.type,
    onSuccess: productsReceived.type,
    onError: productsRequestFailed.type,
  })
export const addProduct = (product) =>
  apiCallBegan({
    url: productsUrl,
    data: product,
    method: 'post',
    onSuccess: productAdded.type,
  })
export const updateProduct = (productId) =>
  apiCallBegan({
    url: productsUrl + '/' + productId,
    // data: productId,
    method: 'put',
    onSuccess: productUpdated.type,
  })
export const deleteProduct = (productId) =>
  apiCallBegan({
    url: productsUrl + '/' + productId,
    //  data: product,
    method: 'delete',
    onSuccess: productDeleted.type,
  })

//Memoization
//Memoization is a technique for optimizing expensive functions
//Next time we call this function before execute that expensive logic it will  look at the cache
export const getFilteredProducts = (filterType) =>
  createSelector(
    (state) => state.entities.products.list,
    (products) => products.filter((product) => product.category === filterType),
  )
