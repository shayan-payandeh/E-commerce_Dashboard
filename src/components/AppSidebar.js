import React from 'react'
import { useSelector } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
// sidebar nav config
import navigation from '../_nav'
import logo from '../assets/images/eCommerceLogo.png'

const AppSidebar = () => {
  const sidebarShow = useSelector((state) => state.uis.hamburger.sidebarShow)
  return (
    <CSidebar
      position="fixed"
      visible={JSON.parse(sidebarShow)}
      // onVisibleChange={(visible) => {
      //   dispatch(changeState({ sidebarShow: visible }))
      // }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} alt={'panelLogo'} width={100} height={40} />
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
