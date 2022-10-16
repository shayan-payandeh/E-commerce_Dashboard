/* eslint-disable prettier/prettier */
import _ from 'lodash'

export const DefaultPageSize = 5
export const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const Years = [_.range(1980, 2005)][0]
export const Days = [_.range(1, 32)][0]

export const api = 'http://localhost:9000/api'
export const productsUrl = '/products'
export const usersUrl = '/users'
export const ordersUrl = '/orders'
export const brandsUrl = '/brands'
export const categoriesUrl = '/categories'
export const unit = '  هزارتومان'
