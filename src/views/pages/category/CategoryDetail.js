/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect } from 'react'
import { api, categoriesUrl } from 'src/api'
import { Controller, useForm } from 'react-hook-form'
import { List, ListItem, TextField } from '@material-ui/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useParams } from 'react-router-dom'
import SaveButton from 'src/components/SaveButton'
import apiRequest from 'src/functions/apiRequest'

function CategoryDetail() {
  const { id } = useParams()
  const url = `${categoriesUrl}/${id}`
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await (await axios.get(`${api}${url}`)).data
      setValue('name', category.name)
    }
    fetchCategory()
  }, [])

  const saveChanges = async (data) => {
    apiRequest(url, 'put', data)
  }

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form style={{ marginTop: '10px' }} onSubmit={handleSubmit(saveChanges)}>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  style={{ backgroundColor: 'white', marginTop: '30px', direction: 'rtl' }}
                  size="medium"
                  variant="outlined"
                  id="name"
                  inputProps={{ type: 'text', style: { fontFamily: 'IRANsans', fontSize: '14px' } }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? '?????????? ?????????? ??????'
                        : '?????????? ???????????? ??????'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <SaveButton />
          </ListItem>
        </List>
      </form>
    </>
  )
}

export default CategoryDetail
