/* eslint-disable prettier/prettier */
import { CPagination, CPaginationItem } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { DefaultPageSize } from 'src/api'
import persianJS from 'persianjs'

function PaginationComponent(items) {
  const [totalPageNumber, setTotalPageNumber] = useState()
  const [totalPageNumberArray, setTotalPageNumberArray] = useState([])
  const pageSize = DefaultPageSize

  useEffect(() => {
    const totalNumbers = Math.ceil(items.items.length / pageSize)
    const totalNumberArray = Array.from({ length: totalNumbers }, (_, i) => i + 1)
    setTotalPageNumber(totalNumbers)
    setTotalPageNumberArray(totalNumberArray)
  }, [items])

  return (
    <>
      <CPagination aria-label="Page navigation example" className="pagination">
        <CPaginationItem
          disabled={items.activePage === 1 ? true : false}
          onClick={() => items.paginate(items.activePage - 1)}
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>
        {totalPageNumberArray.map((item) => (
          <div key={item}>
            <CPaginationItem
              style={{ fontFamily: 'IRANsans' }}
              onClick={() => items.paginate(item)}
              active={items.activePage === item ? true : false}
            >
              {persianJS(item).englishNumber()._str}
            </CPaginationItem>
          </div>
        ))}
        <CPaginationItem
          disabled={items.activePage === totalPageNumber ? true : false}
          onClick={() => items.paginate(items.activePage + 1)}
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination>
    </>
  )
}

export default PaginationComponent
