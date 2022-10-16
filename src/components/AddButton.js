/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

function AddButton(props) {
  const { navigateAddress, title } = props
  const navigate = useNavigate()
  return (
    <>
      <button className="button" onClick={() => navigate(navigateAddress, { replace: true })}>
        <span className="text">{`${title} جدید`}</span>
        &nbsp;&nbsp;
        <FontAwesomeIcon style={{ fontSize: '12px' }} icon={faPlus} />
      </button>
    </>
  )
}

export default AddButton
