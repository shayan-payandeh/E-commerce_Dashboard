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
import { TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import OrderModal from './OrderModal'

function DataTable({ data, flag, sortHandler, items, removeHandler, editProperty, editType }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [theOrder, setTheOrder] = useState()
  const values = data.map((item) => item.value)
  const edit = items.every((item) => item.edit)
  const remove = items.every((item) => item.delete)
  const modal = items.every((item) => item.modal)

  const modalShowDetail = (item) => {
    setModalVisible(!modalVisible)
    setTheOrder(item)
  }
  return (
    <>
      <CTable responsive hover color="light" striped className="dataTable">
        <CTableHead className="tableHead">
          <CTableRow>
            <CTableHeaderCell className="tableHeaderCell" scope="col">
              شناسه
            </CTableHeaderCell>
            {data.map((item) => (
              <CTableHeaderCell key={item.key} scope="col" className="tableHeaderCell">
                {item.key}
                <TableSortLabel
                  active
                  direction={flag[`${item.value}`]}
                  onClick={() => sortHandler(item.value)}
                />
              </CTableHeaderCell>
            ))}
            {edit && <CTableHeaderCell className="tableHeaderCell" scope="col"></CTableHeaderCell>}
            {remove && (
              <CTableHeaderCell className="tableHeaderCell" scope="col"></CTableHeaderCell>
            )}
            {modal && (
              <CTableHeaderCell className="tableHeaderCell" scope="col">
                {'جزئیات'}
              </CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {items.map((item) => (
            <CTableRow key={item._id}>
              <CTableDataCell className="tableBodyCell">
                {item._id.slice(item._id.length - 7, item._id.length - 1)}
              </CTableDataCell>
              {values.map((value) => (
                <CTableDataCell className="tableBodyCell" key={value}>
                  {item[`${value}`]}
                </CTableDataCell>
              ))}
              {item.edit && (
                <CTableDataCell className="tableBodyCell">
                  <Link to={`${editType}/${item[`${editProperty}`]}`}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                </CTableDataCell>
              )}
              {item.delete && (
                <CTableDataCell className="tableBodyCell">
                  <FontAwesomeIcon
                    cursor={'pointer'}
                    onClick={() => removeHandler(item._id)}
                    icon={faTrash}
                    color="red"
                  />
                </CTableDataCell>
              )}
              {item.modal && (
                <CTableDataCell className="tableBodyCell">
                  <span
                    style={{
                      cursor: 'pointer',
                      color: '#4682B4',
                      textDecoration: 'underline',
                    }}
                    onClick={() => modalShowDetail(item)}
                  >
                    {'مشاهده'}
                  </span>
                  <OrderModal
                    theOrder={theOrder}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                </CTableDataCell>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default DataTable
