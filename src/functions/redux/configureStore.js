/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import callApi from './middleware/callApi'
import reducer from './reducer'

export default function () {
  return configureStore({ reducer, middleware: [callApi] })
}
