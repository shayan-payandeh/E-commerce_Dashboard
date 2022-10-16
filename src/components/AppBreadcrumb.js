import React from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import routes from '../routes'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    for (var i = 0; i < routes.length; i++) {
      var routePath = routes[i]

      if (matchPath({ path: routePath.path, exact: true, strict: false }, pathname)) {
        return routePath.name
      }
    }
    return null
  }
  const getPersianRouteName = (pathname, routes) => {
    for (var i = 0; i < routes.length; i++) {
      var routePath = routes[i]
      if (matchPath({ path: routePath.path, exact: true, strict: false }, pathname)) {
        return routePath.persianName
      }
    }
    return null
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = prev.length === 0 ? getRouteName(currentPathname, routes) : curr
      const routePersianName =
        prev.length === 0 ? getPersianRouteName(currentPathname, routes) : curr
      if (routeName) {
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          persianName: routePersianName === 'add' ? 'اضافه کردن' : routePersianName,
          active: index + 1 === array.length ? true : false,
        })
      }
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">خانه</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.persianName}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
