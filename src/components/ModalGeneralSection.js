/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { Grid, List, ListItem } from '@material-ui/core'
import React from 'react'
import CustomeTextField from './CustomeTextField'

function ModalGeneralSection({ theOrder }) {
  return (
    <>
      <form>
        <List>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField label={'کد پیگیری'} value={theOrder._id} />
              </ListItem>
            </Grid>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField label={'کاربر'} value={!theOrder ? '' : theOrder.username} />
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField
                  label={'روش پرداخت'}
                  value={!theOrder ? '' : theOrder.paymentMethod}
                />
              </ListItem>
            </Grid>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField label={'کرایه'} value={!theOrder ? '' : theOrder.shippingPrice} />
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>
              <ListItem>
                <CustomeTextField label={'مالیات'} value={!theOrder ? '' : theOrder.tax} />
              </ListItem>
            </Grid>
            <Grid item md={4} xs={12}>
              <ListItem>
                <CustomeTextField
                  label={'قیمت اقلام'}
                  value={!theOrder ? '' : theOrder.totalItemsPrice}
                />
              </ListItem>
            </Grid>
            <Grid item md={4} xs={12}>
              <ListItem>
                <CustomeTextField label={'پرداختی'} value={!theOrder ? '' : theOrder.totalPrice} />
              </ListItem>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField
                  label={'وضعیت پرداخت'}
                  value={!theOrder ? '' : theOrder.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                />
              </ListItem>
            </Grid>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField
                  label={'وضعیت'}
                  value={!theOrder ? '' : theOrder.isDelievered ? 'ارسال شده' : 'ارسال نشده'}
                />
              </ListItem>
            </Grid>
            <Grid item md={6} xs={12}>
              <ListItem>
                <CustomeTextField
                  label={'تاریخ'}
                  value={!theOrder ? '' : theOrder.persianCreatedAt}
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </form>
    </>
  )
}

export default ModalGeneralSection
