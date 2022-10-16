/* eslint-disable prettier/prettier */
import axios from 'axios'
import { api } from 'src/api'
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../apiActions'

const callApi =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action)

    const { url, method, data, onStart, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    try {
      const result = await axios.request({
        baseURL: api,
        url: url,
        method,
        data,
      })

      dispatch(apiCallSuccess(result.data))
      if (onSuccess) dispatch({ type: onSuccess, payload: result.data })
    } catch (error) {
      dispatch(apiCallFailed(error.message))
      if (onError) dispatch({ type: onError, payload: error })
    }
    next(action)
  }

export default callApi
