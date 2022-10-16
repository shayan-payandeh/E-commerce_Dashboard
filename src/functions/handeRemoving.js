/* eslint-disable prettier/prettier */
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { api } from 'src/api'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { deleteProduct } from './redux/sliceProducts'
import configureStore from './redux/configureStore'

const handleRemoving = (array, url, id) => {
  let newArray = []
  const removeHandle = async () => {
    // const { dispatch } = configureStore()
    // dispatch(deleteProduct(id))

    const product = await (await axios.delete(`${api}${url}/${id}`)).data
    newArray = array.filter((item) => item._id !== product._id)
    window.location.reload()
  }

  confirmAlert({
    // title: "Confirm to Remove",
    message: 'از حذف این محصول مطمئن هستید ؟ ',
    buttons: [
      {
        label: 'بله',
        onClick: removeHandle,
      },
      {
        label: 'خیر',
        onClick: () => window.close(),
      },
    ],
  })

  return newArray
}

export default handleRemoving
