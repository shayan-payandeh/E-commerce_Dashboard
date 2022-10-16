/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, DefaultPageSize, ordersUrl, unit } from 'src/api'
import PaginationComponent from 'src/components/PaginationComponent'
import Spinner from 'src/components/Spinner'
import { pagination } from 'src/functions/pagination'
import FilterSelect from 'src/components/FilterSelect'
import keySorting from 'src/functions/keySorting'
import DataTable from 'src/components/DataTable'
import numberToPersian from 'src/functions/numberToPersian'

export default function Order() {
  const [dataStatus, setDataStatus] = useState()
  const [originalOrders, setOriginalOrders] = useState([])
  const [orders, setOrders] = useState([])
  const [paginatedOrders, setPaginatedOrders] = useState([])
  const [filterValue, setFilterValue] = useState('All')
  const [flag, setFlag] = useState({})
  const [activePage, setActivePage] = useState(1)
  const pageSize = DefaultPageSize

  const paginate = (activePage) => {
    setActivePage(activePage)
    const paginatedOrders = pagination(activePage, pageSize, orders.length, orders)
    setPaginatedOrders(paginatedOrders)
  }

  useEffect(() => {
    async function fetch() {
      const result = await axios.get(`${api}${ordersUrl}`)
      const orders = result.data.map((order) => ({
        ...order,
        totalItemsPrice: numberToPersian(order.totalItemsPrice / 1000) + unit,
        shippingPrice: numberToPersian(order.shippingPrice / 1000) + unit,
        tax: numberToPersian(order.tax / 1000) + unit,
        totalPrice: numberToPersian(order.totalPrice / 1000) + unit,
      }))
      const users = await (await axios.get(`${api}/user`)).data
      for (const order of orders) {
        for (const user of users) {
          if (order.user === user._id) {
            order.username = user.name
          }
        }
      }
      setDataStatus(result.status)
      setOrders(orders)
      setOriginalOrders(orders)
      ///pagination
      const paginatedOrders = pagination(activePage, pageSize, orders.length, orders)
      setPaginatedOrders(paginatedOrders)
    }
    fetch()
  }, [])

  useEffect(() => {
    paginate(activePage)
  }, [activePage, flag, orders])

  const filterByIsDelievered = ({ target }) => {
    setFilterValue(target.value)

    if (target.value !== 'All') {
      const filteredOrders = originalOrders.filter(
        (product) => product.isDelievered === target.value,
      )
      setOrders(filteredOrders)
    } else setOrders(originalOrders)

    if (activePage !== 1) setActivePage(1)
  }

  const selectValues = [
    { value: 'All', name: 'همه' },
    { value: true, name: 'تحویل داده شده' },
    { value: false, name: 'در حال بررسی' },
  ]

  const odersKeys = [
    { key: 'کاربر', value: 'username' },
    { key: 'مالیات', value: 'tax' },
    { key: 'پرداختی', value: 'totalPrice' },
    { key: 'وضعیت', value: 'orderStatus' },
    { key: 'تاریخ', value: 'persianCreatedAt' },
  ]

  const sortingHandler = (value) => {
    setActivePage(1)
    const res = keySorting(value, orders, flag)
    setOrders(res['items'])
    setFlag(res['flag'])
  }

  const ordersToShow = paginatedOrders.map((order) => ({
    ...order,
    orderStatus: order.isDelievered ? 'تحویل داده شده' : 'درحال بررسی',
    modal: true,
  }))

  return (
    <>
      <FilterSelect
        values={selectValues}
        filterHandler={filterByIsDelievered}
        filterValue={filterValue}
      />
      {dataStatus !== 200 ? (
        <Spinner />
      ) : (
        <DataTable data={odersKeys} flag={flag} sortHandler={sortingHandler} items={ordersToShow} />
      )}
      {orders.length > 0 && (
        <PaginationComponent paginate={(e) => paginate(e)} items={orders} activePage={activePage} />
      )}
    </>
  )
}
