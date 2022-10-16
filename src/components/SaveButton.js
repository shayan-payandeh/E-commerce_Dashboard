/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from 'react'
import { Button } from '@material-ui/core'

function SaveButton() {
  return (
    <>
      <Button
        style={{
          boxShadow: '0px 0px 4px 1px',
          textTransform: 'capitalize',
        }}
        variant="contained"
        color="primary"
        type="submit"
      >
        <span style={{ fontFamily: 'IRANsans', fontSize: '14px' }}> {'ذخیره'}</span>
      </Button>
    </>
  )
}

export default SaveButton
