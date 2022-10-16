/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, DefaultPageSize } from 'src/api'
import PaginationComponent from 'src/components/PaginationComponent'
import Spinner from 'src/components/Spinner'
import { pagination } from 'src/functions/pagination'
import FilterSelect from 'src/components/FilterSelect'
import DataTable from 'src/components/DataTable'
import persianJs from 'persianjs'
import keySorting from 'src/functions/keySorting'

const Users = () => {
  const [dataStatus, setDataStatus] = useState()
  const [originalUsers, setOriginalUsers] = useState([])
  const [users, setUsers] = useState([])
  const [paginatedUsers, setPaginatedUsers] = useState([])
  const [filterValue, setFilterValue] = useState('All')
  const [flag, setFlag] = useState({})
  const [activePage, setActivePage] = useState(1)
  const pageSize = DefaultPageSize

  const paginate = (activePage) => {
    setActivePage(activePage)
    const paginatedUsers = pagination(activePage, pageSize, users.length, users)
    setPaginatedUsers(paginatedUsers)
  }

  useEffect(() => {
    async function fetchUsers() {
      const result = await axios.get(`${api}/user`)
      const users = result.data
      setUsers(users)
      setOriginalUsers(users)
      setDataStatus(result.status)

      ///pagination
      const paginatedUsers = pagination(activePage, pageSize, users.length, users)
      setPaginatedUsers(paginatedUsers)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    paginate(activePage)
  }, [activePage, flag, users])

  const filterByIsAdmin = ({ target }) => {
    setFilterValue(target.value)
    if (target.value !== 'All') {
      const filteredUsers = originalUsers.filter((product) => product.isAdmin === target.value)
      setUsers(filteredUsers)
    } else setUsers(originalUsers)

    if (activePage !== 1) setActivePage(1)
  }

  const selectValues = [
    { value: 'All', name: 'همه' },
    { value: true, name: 'مدیر' },
    { value: false, name: 'کاربر' },
  ]

  const usersKeys = [
    { key: 'نام', value: 'name' },
    { key: 'ایمیل', value: 'email' },
    { key: 'نوع', value: 'userType' },
    { key: 'تاریخ ایجاد', value: 'persianCreatedAt' },
  ]

  const sortingHandler = (value) => {
    setActivePage(1)
    const res = keySorting(value, users, flag)
    setUsers(res['items'])
    setFlag(res['flag'])
  }

  const usersToShow = paginatedUsers.map((user) => ({
    ...user,
    userType: user.isAdmin ? 'مدیر' : 'کاربر',
    time: persianJs(user.time).englishNumber()._str,
  }))

  return (
    <>
      <FilterSelect
        values={selectValues}
        filterValue={filterValue}
        filterHandler={filterByIsAdmin}
      />
      {dataStatus !== 200 ? (
        <Spinner />
      ) : (
        <div>
          <DataTable
            data={usersKeys}
            flag={flag}
            sortHandler={sortingHandler}
            items={usersToShow}
          />
          {users.length > 0 && (
            <PaginationComponent
              paginate={(e) => paginate(e)}
              items={users}
              activePage={activePage}
            />
          )}
        </div>
      )}
    </>
  )
}

export default Users
