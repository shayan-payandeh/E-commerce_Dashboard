/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { MenuItem, TextField } from '@material-ui/core'
import React from 'react'

function CustomProductTextField({
  inputName,
  fieldType,
  placeholder,
  field,
  errors,
  menuItems,
  select,
  min,
  max,
}) {
  return (
    <>
      <TextField
        style={{ backgroundColor: 'white', marginTop: '15px' }}
        variant="outlined"
        size="small"
        select={select ? true : false}
        fullWidth
        id={inputName}
        inputProps={{
          type: fieldType,
          style: { fontFamily: 'IRANsans', fontSize: '14px', textAlign: 'right' },
        }}
        error={Boolean(errors)}
        placeholder={placeholder ? placeholder : ''}
        helperText={
          errors
            ? errors.type === 'minLength'
              ? `${placeholder} کوتاه است`
              : errors.type === 'min'
              ? `${placeholder} باید بیشتر از ${min} باشد`
              : errors.type === 'max'
              ? `${placeholder} باید بین ${min} تا ${max} باشد`
              : `${placeholder} الزامی است`
            : ''
        }
        {...field}
      >
        {menuItems &&
          menuItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
      </TextField>
    </>
  )
}

export default CustomProductTextField
