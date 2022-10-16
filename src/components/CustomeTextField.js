/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { TextField } from '@material-ui/core'
import React from 'react'

function CustomeTextField({ label, value }) {
  return (
    <>
      <TextField
        label={label}
        variant="filled"
        value={value}
        fullWidth
        inputProps={{
          style: { fontFamily: 'IRANsans', fontSize: '14px' },
        }}
      />
    </>
  )
}

export default CustomeTextField
