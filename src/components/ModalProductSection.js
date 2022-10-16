/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import persianJs from 'persianjs'
import React from 'react'

function ModalProductSection({ theOrder }) {
  return (
    <>
      <CTable className="modalPrdoductsTable" responsive hover color="light" striped>
        <CTableHead className="tableHead">
          <CTableRow>
            {['تصویر', 'نام', 'تعداد', 'قیمت'].map((key) => (
              <CTableHeaderCell className="tableHeaderCell" key={key} scope="col">
                {key}
              </CTableHeaderCell>
            ))}
          </CTableRow>
        </CTableHead>
        {theOrder && (
          <CTableBody>
            {theOrder.orderItems.map((item) => (
              <CTableRow key={item._id}>
                <CTableDataCell className="tableBodyCell">{item.image}</CTableDataCell>
                <CTableDataCell className="tableBodyCell">{item.name}</CTableDataCell>
                <CTableDataCell className="tableBodyCell">
                  {persianJs(item.quantity).englishNumber()._str}
                </CTableDataCell>
                <CTableDataCell className="tableBodyCell">
                  <span> {persianJs(item.price).englishNumber()._str}</span>
                  <span style={{ fontSize: '10px' }}> {'هزارتومان'}</span>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        )}
      </CTable>
    </>
  )
}

export default ModalProductSection
