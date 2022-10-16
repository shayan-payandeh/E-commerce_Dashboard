/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from 'react'
import { CRow, CCol, CWidgetStatsA, CDropdown, CDropdownToggle, CDropdownMenu } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import persianJs from 'persianjs'
import CIcon from '@coreui/icons-react'
import { cilArrowTop, cilOptions } from '@coreui/icons'
import { commaNumber } from 'src/functions/commaNumber'
import { Months } from 'src/api'
import { parseInt } from 'lodash'

const WidgetsDropdown = ({ sold, invest, userQuantity, orders }) => {
  const showInvest = commaNumber(invest > 0 ? persianJs(invest).englishNumber()._str : 0)
  const showSold = commaNumber(sold > 0 ? persianJs(sold).englishNumber()._str : 0)
  const months = [
    { 1: 'فروردین' },
    { 2: 'اردیبهشت' },
    { 3: 'خرداد' },
    { 4: 'تیر' },
    { 5: 'مرداد' },
    { 6: 'شهریور' },
    { 7: 'مهر' },
    { 8: 'آبان' },
    { 9: 'آذر' },
    { 10: 'دی' },
    { 11: 'بهمن' },
    { 12: 'اسفند' },
  ]
  const lastSixMonth = (x) => {
    let final
    if (x === 6) {
      final = [1, 2, 3, 4, 5, 6]
    } else if (x < 6) {
      const res = months.map((month) => Object.keys(month).toString())
      const result = res.map((item) => parseInt(item))
      final = result.filter((item) => {
        if (item >= 1 && item <= x) {
          return item
        }
      })
      const monthsLeftNumber = 6 - final.length
      for (let index = 1; index <= monthsLeftNumber; index++) {
        index === 1
          ? final.unshift(12)
          : index === 2
          ? final.unshift(11)
          : index === 3
          ? final.unshift(10)
          : index === 4
          ? final.unshift(9)
          : final.unshift(8)
      }
    } else if (x > 6) {
      const array = Array.from(Array(x).keys())
      final = array.map((item) => item + 1).slice(array.length - 6, array.length)
    }

    return final
  }

  const dateMonth = new Date().toLocaleDateString('fa-IR')
  const persianCurrentMonth = `${dateMonth}`.split('/')[1]
  const englishCurrentMonth = persianCurrentMonth
    ? parseInt(persianJs(persianCurrentMonth).persianNumber().toString())
    : 0

  const lastSixMonthsNumberArray = lastSixMonth(englishCurrentMonth)

  let lastSixMonthsLabel = []
  for (const number of lastSixMonthsNumberArray) {
    for (const month of months) {
      if (parseInt(Object.keys(month).toString()) === number) {
        lastSixMonthsLabel.push(Object.values(month).toString())
      }
    }
  }

  let monthsSold = []
  if (orders && orders.length > 0) {
    for (const month of lastSixMonthsNumberArray) {
      for (const order of orders) {
        const persianDateMonth = order.persianCreatedAt.split('/')[1]
        const englishDateMonth = persianDateMonth
          ? parseInt(persianJs(persianDateMonth).persianNumber().toString())
          : 0
        if (englishDateMonth === month) {
          monthsSold.push({ [englishDateMonth]: order.totalPrice })
        }
      }
    }
  }

  let solding = []
  for (const month of lastSixMonthsNumberArray) {
    for (const item of monthsSold) {
      if (month === parseInt(Object.keys(item).toString())) {
        const x = parseInt(Object.values(item).toString())
        const check = solding.find((item) => parseInt(Object.keys(item)) === month)

        if (check) {
          solding.forEach((item) => {
            if (parseInt(Object.keys(item).toString()) === month) {
              item[month] = item[month] + x
            }
          })
        } else solding.push({ [month]: x })
      } else {
        const check = solding.find((item) => parseInt(Object.keys(item)) === month)
        if (!check) {
          solding.push({ [month]: 0 })
        }
      }
    }
  }

  let soldValue = []
  for (const iterator of solding) {
    const x = parseInt(Object.values(iterator).toString())
    soldValue.push(x)
  }

  return (
    <CRow>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              {showInvest}&nbsp;
              <span style={{ fontSize: '14px' }}>{'تومان'}</span>
              <span className="fs-6 fw-normal">
                {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
              </span>
            </>
          }
          title="ارزش کل"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: lastSixMonthsLabel,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [8000000, 10000000, 10100000, 10100000, 10100000, 10100000],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              {showSold}&nbsp;
              <span style={{ fontSize: '14px' }}>{'تومان'}</span>
              <span className="fs-6 fw-normal">
                {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
              </span>
            </>
          }
          title=" فروش"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: lastSixMonthsLabel,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: soldValue,
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={4}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              {userQuantity > 0 ? persianJs(userQuantity).englishNumber().toString() : '-'}&nbsp;
              <span style={{ fontSize: '14px' }}>{'نفر'} </span>
              <span className="fs-6 fw-normal">{/* (84.7% <CIcon icon={cilArrowTop} />) */}</span>
            </>
          }
          title=" کاربران"
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: lastSixMonthsLabel,
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
