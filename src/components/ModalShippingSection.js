/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from 'react'
import { Grid, List, ListItem } from '@material-ui/core'
import CustomeTextField from './CustomeTextField'

function ModalShippingSection({ theOrder }) {
  return (
    <>
      <List>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <ListItem>
              <CustomeTextField
                value={theOrder.shippingAddress.fullname}
                label={'نام و نام خانوادگی'}
              />
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <ListItem>
              <CustomeTextField value={theOrder.shippingAddress.country} label={'کشور'} />
            </ListItem>
          </Grid>
          <Grid item md={4} xs={12}>
            <ListItem>
              <CustomeTextField value={theOrder.shippingAddress.city} label={'شهر'} />
            </ListItem>
          </Grid>
          <Grid item md={4} xs={12}>
            <ListItem>
              <CustomeTextField value={theOrder.shippingAddress.postalCode} label={'کد پستی'} />
            </ListItem>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <ListItem>
              <CustomeTextField value={theOrder.shippingAddress.address} label={'آدرس پستی'} />
            </ListItem>
          </Grid>
        </Grid>
      </List>
    </>
  )
}

export default ModalShippingSection
