/* eslint-disable prettier/prettier */
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from 'src/api'
import { getError } from './getError'

const apiRequest = async (url, method, data, headers) => {
  const message = method === 'put' ? 'ویرایش با موفقیت انجام شد' : 'آیتم جدید با موفقیت ثبت شد'
  try {
    await axios.request(`${api}${url}`, {
      method,
      data,
      headers: headers ? headers : null,
    })
    toast.success(message, {
      style: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: '13px',
        fontFamily: 'IRANsans',
        textAlign: 'right',
      },
      position: toast.POSITION.BOTTOM_RIGHT,
    })
  } catch (error) {
    toast.error(getError(error), { position: toast.POSITION.BOTTOM_RIGHT })
  }
}

export default apiRequest
