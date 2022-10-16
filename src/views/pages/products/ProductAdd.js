/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, brandsUrl, categoriesUrl, productsUrl } from 'src/api'
import { Controller, useForm } from 'react-hook-form'
import { List, ListItem, Grid } from '@material-ui/core'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SaveButton from 'src/components/SaveButton'
import CustomProductTextField from 'src/components/CustomProductTextField'
import apiRequest from 'src/functions/apiRequest'
import { addProduct } from 'src/functions/redux/sliceProducts'
import { useSelector } from 'react-redux'

function ProductAdd() {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const url = `${productsUrl}`

  // const products = useSelector((state) => state.entities.products)
  // console.log(products)

  useEffect(() => {
    const fetchProducts = async () => {
      const allCategories = await (await axios.get(`${api}${categoriesUrl}`)).data
      const allBrands = await (await axios.get(`${api}${brandsUrl}`)).data
      setCategories(allCategories.map((category) => category.name))
      setBrands(allBrands.map((brand) => brand.name))
    }
    fetchProducts()
  }, [])

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const saveChanges = async (data) => {
    const elm = document.getElementById('image')
    const theFormData = new FormData()
    for (const key in data) {
      key === 'image'
        ? theFormData.append(`image`, elm.files[0])
        : theFormData.append(`${key}`, data[key])
    }
    const headers = new Headers({ 'content-type': 'multipart/form-data' })
    apiRequest(url, 'post', theFormData, headers)
    // dispatch(addProduct(theFormData))
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
      <form onSubmit={handleSubmit(saveChanges)}>
        <List>
          <Grid container>
            <Grid item md={6} xs={10}>
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
                    <CustomProductTextField
                      inputName={'name'}
                      errors={errors.name}
                      field={field}
                      fieldType="text"
                      placeholder={'نام'}
                      errorType={'minLength'}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
            <Grid item md={6} xs={10}>
              <ListItem>
                <Controller
                  name="slug"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 3,
                  }}
                  render={({ field }) => (
                    <CustomProductTextField
                      inputName={'slug'}
                      errors={errors.slug}
                      field={field}
                      fieldType="text"
                      placeholder={'عنوان'}
                      errorType={'minLength'}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} xs={10}>
              <ListItem>
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <CustomProductTextField
                      menuItems={categories}
                      inputName={'category'}
                      errors={errors.category}
                      field={field}
                      fieldType={'text'}
                      placeholder={'دسته'}
                      select={true}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
            <Grid item md={6} xs={10}>
              <ListItem>
                <Controller
                  name="brand"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <CustomProductTextField
                      menuItems={brands}
                      inputName={'brand'}
                      errors={errors.brand}
                      field={field}
                      fieldType={'text'}
                      placeholder={'برند'}
                      select={true}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
          </Grid>
          <ListItem>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
              render={({ field }) => (
                <CustomProductTextField
                  inputName={'description'}
                  errors={errors.description}
                  field={field}
                  fieldType="text"
                  placeholder={'توضیحات'}
                  errorType={'minLength'}
                />
              )}
            ></Controller>
          </ListItem>
          <Grid container>
            <Grid item md={6} xs={10}>
              <ListItem>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    min: 1000,
                  }}
                  render={({ field }) => (
                    <CustomProductTextField
                      inputName={'price'}
                      errors={errors.price}
                      field={field}
                      fieldType="number"
                      placeholder={'قیمت'}
                      errorType={'min'}
                      min={1000}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
            <Grid item md={6} xs={10}>
              <ListItem>
                <Controller
                  name="countInStock"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    min: 1,
                    max: 10,
                  }}
                  render={({ field }) => (
                    <CustomProductTextField
                      inputName={'countInStock'}
                      errors={errors.countInStock}
                      field={field}
                      fieldType="number"
                      placeholder={'تعداد'}
                      errorType={'minMax'}
                      min={1}
                      max={10}
                    />
                  )}
                ></Controller>
              </ListItem>
            </Grid>
          </Grid>
          <ListItem>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <CustomProductTextField
                  inputName={'image'}
                  errors={errors.image}
                  field={field}
                  fieldType="file"
                  placeholder={'تصویر'}
                />
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

export default ProductAdd
