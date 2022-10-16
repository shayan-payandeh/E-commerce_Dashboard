/* eslint-disable prettier/prettier */
import React, { lazy, useEffect, useState } from 'react'
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import persianJs from 'persianjs'
import axios from 'axios'
import { api } from 'src/api.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
// const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [usersMonth, setUsersMonth] = useState([])
  const [usersYear, setUsersYear] = useState([])
  const [usersQuantity, setUsersQuantity] = useState(0)
  const [monthFlag, setMonthFlag] = useState(true)
  const [yearFlag, setYearFlag] = useState(false)
  const [totalItemsCount, setTotalItemsCount] = useState(0)
  const [ordersMonth, setOrdersMonth] = useState([])
  const [ordersYear, setOrdersYear] = useState([])
  const [soldYearFlag, setSoldYearFlag] = useState(true)
  const [soldMonthFlag, setSoldMonthFlag] = useState(false)
  const [orders, setOrders] = useState()
  const [sold, setSold] = useState(0)
  const [invest, setInvest] = useState(0)

  // const random = (min, max) => {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // };

  const monthChanges = () => {
    setMonthFlag(true)
    setYearFlag(false)
  }

  const yearChanges = () => {
    setMonthFlag(false)
    setYearFlag(true)
  }

  const soldMonthChanges = () => {
    setSoldMonthFlag(true)
    setSoldYearFlag(false)
  }
  const soldYearChanges = () => {
    setSoldMonthFlag(false)
    setSoldYearFlag(true)
  }

  useEffect(() => {
    const fetch = async () => {
      let finalArrayMonth = []
      let finalArrayYear = []

      let soldArrayMonth = []
      let soldArrayYear = []

      const orders = await (await axios.get(`${api}/orders`)).data
      setOrders(orders)
      const sold = orders.reduce((a, c) => c.totalPrice + a, 0)
      setSold(sold)
      // const ordersMonth = orders.map((order) => new Date(order.createdAt).getMonth())
      const ordersMonth = orders.map((order) =>
        parseInt(persianJs(order.persianCreatedAt.split('/')[1]).persianNumber()._str),
      )
      // const ordersYear = orders.map((order) => new Date(order.createdAt).getFullYear())
      const ordersYear = orders.map((order) =>
        parseInt(persianJs(order.persianCreatedAt.slice(0, 4)).persianNumber()._str),
      )
      for (let index = 1; index <= 12; index++) {
        const x = ordersMonth.find((item) => item === index)
        if (x) {
          const result = ordersMonth.filter((item) => item === index)
          soldArrayMonth.push(result.length)
        } else {
          soldArrayMonth.push(0)
        }
      }
      for (let index = 1400; index <= 1401; index++) {
        const x = ordersYear.find((item) => item === index)
        if (x) {
          const result = ordersYear.filter((item) => item === index)
          soldArrayYear.push(result.length)
        } else {
          soldArrayYear.push(0)
        }
      }
      setOrdersMonth(soldArrayMonth)
      setOrdersYear(soldArrayYear)

      const products = await (await axios.get(`${api}/products`)).data
      const invest = products.reduce((a, c) => parseInt(c.price) * parseInt(c.countInStock) + a, 0)
      setInvest(invest)

      const users = await (await axios.get(`${api}/user`)).data
      setUsersQuantity(users.length)
      const usersMonth = users.map((user) =>
        parseInt(persianJs(user.persianCreatedAt.split('/')[1]).persianNumber()._str),
      )
      const usersYear = users.map((user) =>
        parseInt(persianJs(user.persianCreatedAt.slice(0, 4)).persianNumber()._str),
      )

      for (let index = 1; index <= 12; index++) {
        const x = usersMonth.find((item) => item === index)
        if (x) {
          const result = usersMonth.filter((item) => item === index)
          finalArrayMonth.push(result.length)
        } else {
          finalArrayMonth.push(0)
        }
      }

      for (let index = 1400; index <= 1401; index++) {
        const x = usersYear.find((item) => item === index)
        if (x) {
          const result = usersYear.filter((item) => item === index)
          finalArrayYear.push(result.length)
        } else {
          finalArrayYear.push(0)
        }
      }
      setUsersMonth(finalArrayMonth)
      setUsersYear(finalArrayYear)
    }
    fetch()
  }, [])

  const config = {
    type: 'doughnut',
    data: [...ordersYear],
  }
  return (
    <>
      <WidgetsDropdown sold={sold} invest={invest} userQuantity={usersQuantity} orders={orders} />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                کاربران
              </h4>
              <div className="small text-medium-emphasis">
                {monthFlag && <span>فروردین - اسفند 1401</span>}
                {yearFlag && <span>1400 - 1401</span>}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              {/* <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton> */}
              <CButtonGroup className="float-end me-3">
                {['Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    onClick={value === 'Month' ? monthChanges : yearChanges}
                    active={monthFlag ? value === 'Month' : value === 'Year'}
                  >
                    {value === 'Month' ? 'ماه' : 'سال'}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: monthFlag
                ? [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند',
                  ]
                : ['1400', '1401'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: monthFlag ? [...usersMonth] : [...usersYear],
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: 1,
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                سفارشات
              </h4>
              <div className="small text-medium-emphasis">
                {soldMonthFlag && <span>فروردین - اسفند 1401</span>}
                {soldYearFlag && <span>1400 - 1401</span>}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    onClick={value === 'Month' ? soldMonthChanges : soldYearChanges}
                    active={soldMonthFlag ? value === 'Month' : value === 'Year'}
                  >
                    {value === 'Month' ? 'ماه' : 'سال'}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: !soldYearFlag
                ? [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند',
                  ]
                : ['1400', '1401'],
              datasets: [
                {
                  label: 'My First dataset',
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  // backgroundColor: [
                  //   '#DCDCDC',
                  //   '#2F4F4F',
                  //   '#A9A9A9',
                  //   '#4169E1',
                  //   '#87CEEB',
                  //   '#2E8B57',
                  //   '#8B4513',
                  //   '#6A5ACD',
                  //   '#F0E68C',
                  //   '#FF7F50',
                  //   '#FF69B4',
                  //   '#CD5C5C',
                  // ],
                  data: soldYearFlag ? [...ordersYear] : [...ordersMonth],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: 1,
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      {/* <WidgetsBrand withCharts /> */}
    </>
  )
}

export default Dashboard
