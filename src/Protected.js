/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    return <Navigate to="/" replace />
  }
  return children
}

export default Protected
