/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import React, { useState } from 'react'
import ModalGeneralSection from './ModalGeneralSection'
import ModalProductSection from './ModalProductSection'
import ModalShippingSection from './ModalShippingSection'

function OrderModal({ theOrder, modalVisible, setModalVisible }) {
  const [tabActiveKey, setTabActiveKey] = useState(2)
  return (
    <>
      <CModal
        size="xl"
        alignment="center"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <CModalHeader closeButton={false}>
          <CModalTitle>جزئیات سفارش</CModalTitle>
        </CModalHeader>
        <CModalBody style={{ fontFamily: 'IRANsans' }}>
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink href="#" active={tabActiveKey === 1} onClick={() => setTabActiveKey(1)}>
                اطلاعات
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#" active={tabActiveKey === 2} onClick={() => setTabActiveKey(2)}>
                اقلام
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#" active={tabActiveKey === 3} onClick={() => setTabActiveKey(3)}>
                آدرس پستی
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={tabActiveKey === 1}>
              <ModalGeneralSection theOrder={theOrder} />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="profile-tab" visible={tabActiveKey === 2}>
              <ModalProductSection theOrder={theOrder} />
            </CTabPane>
            <CTabPane role="tabpanel" aria-labelledby="contact-tab" visible={tabActiveKey === 3}>
              <ModalShippingSection theOrder={theOrder} />
            </CTabPane>
          </CTabContent>
        </CModalBody>
        <CModalFooter>
          <CButton
            style={{ fontFamily: 'IRANsans', fontSize: '14px' }}
            color="secondary"
            onClick={() => setModalVisible(false)}
          >
            خروج
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default OrderModal
