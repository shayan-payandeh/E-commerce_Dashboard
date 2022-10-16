import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilChart, cilMenu, cilSpreadsheet, cilWindow } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'داشبورد',
    to: '/dashboard',
    icon: <CIcon icon={cilWindow} customClassName="nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },

  {
    component: CNavGroup,
    name: 'لیست ها',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'کاربران',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'محصولات',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'سفارشات',
        to: '/orders',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'بیشتر',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'دسته ها',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'برندها',
        to: '/brands',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'آمار ',
    to: '/statistic',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
]

export default _nav
