/* eslint-disable prettier/prettier */
import React from 'react'
import { brandsUrl } from 'src/api'
import { Controller, useForm } from 'react-hook-form'
import { List, ListItem, TextField } from '@material-ui/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SaveButton from 'src/components/SaveButton'
import apiRequest from 'src/functions/apiRequest'

function BrandAdd() {
  const url = brandsUrl
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const saveChanges = async (data) => {
    apiRequest(url, 'post', data)
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
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  style={{ backgroundColor: 'white', marginTop: '30px' }}
                  size="medium"
                  variant="outlined"
                  id="name"
                  placeholder="عنوان"
                  inputProps={{ type: 'text', style: { fontFamily: 'IRANsans' } }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'عنوان کوتاه است'
                        : 'عنوان الزامی است'
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

export default BrandAdd
