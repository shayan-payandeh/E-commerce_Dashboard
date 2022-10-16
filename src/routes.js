import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import('./views/pages/users/Users'))
const Products = React.lazy(() => import('./views/pages/products/Products'))
const ProductDetail = React.lazy(() => import('./views/pages/products/ProductDetail'))
const ProductAdd = React.lazy(() => import('./views/pages/products/ProductAdd'))
const Categories = React.lazy(() => import('./views/pages/category/Category'))
const CategoryAdd = React.lazy(() => import('./views/pages/category/CategoryAdd'))
const CategoryDetail = React.lazy(() => import('./views/pages/category/CategoryDetail'))
const Brands = React.lazy(() => import('./views/pages/brand/Brand'))
const BrandAdd = React.lazy(() => import('./views/pages/brand/BrandAdd'))
const BrandDetail = React.lazy(() => import('./views/pages/brand/BrandDetail'))
const Orders = React.lazy(() => import('./views/pages/order/Order'))
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home', persianName: 'خانه' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, persianName: 'داشبورد' },
  { path: '/users', name: 'Users', element: Users, persianName: 'کاربران' },
  { path: '/products', name: 'Products', element: Products, exact: true, persianName: 'محصولات' },
  {
    path: '/products/add',
    name: 'ProductAdd',
    element: ProductAdd,
    exact: true,
    persianName: 'اضافه کردن محصول',
  },
  {
    path: '/products/:slug',
    name: 'ProductDetails',
    element: ProductDetail,
    exact: true,
    // persianName: 'محصول',
  },
  {
    path: '/categories',
    name: 'Categories',
    element: Categories,
    exact: true,
    persianName: 'دسته ها',
  },
  {
    path: '/categories/add',
    name: 'CategoryAdd',
    element: CategoryAdd,
    exact: true,
    persianName: '',
  },
  {
    path: '/categories/:id',
    name: 'CategoryDetail',
    element: CategoryDetail,
    exact: true,
    persianName: 'دسته ',
  },
  {
    path: '/brands',
    name: 'Brands',
    element: Brands,
    exact: true,
    persianName: 'برندها',
  },
  {
    path: '/brands/add',
    name: 'BrandAdd',
    element: BrandAdd,
    exact: true,
    persianName: 'اضافه کردن برند',
  },
  {
    path: '/brands/:id',
    name: 'BrandDetail',
    element: BrandDetail,
    exact: true,
    // persianName: 'اضافه کردن برند',
  },

  {
    path: '/orders',
    name: 'Orders',
    element: Orders,
    exact: true,
    persianName: 'سفارشات',
  },

  {
    path: '/profile',
    name: 'Profile',
    element: Profile,
    exact: true,
    persianName: 'پروفایل',
  },
]

export default routes
