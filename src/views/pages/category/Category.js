/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, categoriesUrl, DefaultPageSize } from 'src/api'
import Spinner from 'src/components/Spinner'
import PaginationComponent from 'src/components/PaginationComponent'
import { pagination } from 'src/functions/pagination'
import AddButton from 'src/components/AddButton'
import DataTable from 'src/components/DataTable'
import keySorting from 'src/functions/keySorting'
import handleRemoving from 'src/functions/handeRemoving'

export default function Category() {
  const [categories, setCategories] = useState([])
  const [paginatedCategories, setPaginatedCategories] = useState([])
  const [flag, setFlag] = useState({})
  const [activePage, setActivePage] = useState(1)
  const pageSize = DefaultPageSize

  const paginate = (activePage) => {
    setActivePage(activePage)
    const paginateCategories = pagination(activePage, pageSize, categories.length, categories)
    setPaginatedCategories(paginateCategories)
  }

  useEffect(() => {
    async function fetchCategories() {
      const categories = await (await axios.get(`${api}${categoriesUrl}`)).data
      setCategories(categories)
      ///pagination
      const paginatedCategories = pagination(activePage, pageSize, categories.length, categories)
      setPaginatedCategories(paginatedCategories)
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    paginate(activePage)
  }, [activePage, flag])

  const removeHandle = (id) => {
    const newCategories = handleRemoving(categories, categoriesUrl, id)
    newCategories.length > 1 ? setCategories(newCategories) : setCategories(categories)
  }

  const categoriesKey = [{ key: 'عنوان', value: 'name' }]

  const sortingHandler = (value) => {
    setActivePage(1)
    const res = keySorting(value, categories, flag)
    setCategories(res['items'])
    setFlag(res['flag'])
  }

  const categoriesToShow = paginatedCategories.map((category) => ({
    ...category,
    edit: true,
    delete: true,
  }))

  return (
    <>
      <AddButton navigateAddress={`${categoriesUrl}/add`} title="دسته" />
      {categories.length < 1 ? (
        <Spinner />
      ) : (
        <DataTable
          data={categoriesKey}
          flag={flag}
          sortHandler={sortingHandler}
          removeHandler={removeHandle}
          items={categoriesToShow}
          editProperty={'_id'}
          editType={categoriesUrl}
        />
      )}
      {categories.length > 0 && (
        <PaginationComponent
          paginate={(e) => paginate(e)}
          items={categories}
          activePage={activePage}
        />
      )}
    </>
  )
}
