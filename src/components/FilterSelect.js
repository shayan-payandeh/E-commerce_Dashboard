/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { MenuItem, Select } from '@material-ui/core'
import React from 'react'

function FilterSelect({ values, filterHandler, filterValue }) {
  return (
    <>
      <Select
        onChange={(e) => filterHandler(e)}
        value={filterValue}
        label="User Type"
        style={{
          marginTop: '5px',
          width: '150px',
          border: 'none',
          padding: '0px',
          height: '40px',
          marginRight: '10px',
          marginLeft: 'auto',
          fontFamily: 'IRANsans',
          fontSize: '14px',
        }}
        variant="outlined"
        size="small"
      >
        {values.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            style={{ fontFamily: 'IRANsans', fontSize: '13px' }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}

export default FilterSelect
