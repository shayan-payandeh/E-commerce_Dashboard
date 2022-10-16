import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">
          &copy; حق کپی برای تیم{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Shayan Developer
          </a>
          &nbsp; محفوظ است
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">
          <span style={{ fontSize: '13px' }}> {'  توسعه توسط '}</span>
          <span style={{ color: 'blue' }}> Shayan</span>
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
