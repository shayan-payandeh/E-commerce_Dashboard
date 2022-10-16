/* eslint-disable prettier/prettier */
import { Grid, List, ListItem } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { api, brandsUrl, categoriesUrl, productsUrl } from 'src/api'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomProductTextField from 'src/components/CustomProductTextField'
import SaveButton from 'src/components/SaveButton'
import apiRequest from 'src/functions/apiRequest'

function ProductDetail() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const { slug } = useParams()
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const url = `${productsUrl}/${slug}`

  useEffect(() => {
    const fetch = async () => {
      const product = await (await axios.get(`${api}${url}`)).data
      const allCategories = await (await axios.get(`${api}${categoriesUrl}`)).data
      const allBrands = await (await axios.get(`${api}${brandsUrl}`)).data
      setCategories(allCategories.map((category) => category.name))
      setBrands(allBrands.map((brand) => brand.name))

      setValue('name', product.name)
      setValue('slug', product.slug)
      setValue('category', product.category)
      setValue('brand', product.brand)
      setValue('description', product.description)
      setValue('countInStock', product.countInStock)
      setValue('price', product.price)
    }
    fetch()
  }, [])

  const saveChanges = async (data) => {
    const elm = document.getElementById('image')
    const theFormData = new FormData()
    for (const key in data) {
      key === 'image' && data[key] !== ''
        ? theFormData.append(`image`, elm.files[0])
        : theFormData.append(`${key}`, data[key])
    }
    const headers = new Headers({ 'content-type': 'multipart/form-data' })
    apiRequest(url, 'put', theFormData, headers)
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
          <Grid container>
            <Grid item md={6} xs={10}>
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
                    minLength: 2,
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

export default ProductDetail
