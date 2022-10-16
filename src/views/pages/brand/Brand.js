/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, brandsUrl, DefaultPageSize } from 'src/api'
import Spinner from 'src/components/Spinner'
import PaginationComponent from 'src/components/PaginationComponent'
import { pagination } from 'src/functions/pagination'
import AddButton from 'src/components/AddButton'
import DataTable from 'src/components/DataTable'
import keySorting from 'src/functions/keySorting'
import handleRemoving from 'src/functions/handeRemoving'

export default function Brand() {
  const [brands, setBrands] = useState([])
  const [paginatedBrands, setPaginatedBrands] = useState([])
  const [flag, setFlag] = useState({})
  const [activePage, setActivePage] = useState(1)
  const pageSize = DefaultPageSize

  const paginate = (activePage) => {
    setActivePage(activePage)
    const paginateBrands = pagination(activePage, pageSize, brands.length, brands)
    setPaginatedBrands(paginateBrands)
  }

  useEffect(() => {
    async function fetchBrands() {
      const brands = await (await axios.get(`${api}${brandsUrl}`)).data
      setBrands(brands)
      ///pagination
      const paginatedBrands = pagination(activePage, pageSize, brands.length, brands)
      setPaginatedBrands(paginatedBrands)
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    paginate(activePage)
  }, [activePage, flag])

  const removeHandle = (id) => {
    const newBrands = handleRemoving(brands, brandsUrl, id)
    newBrands.length > 1 ? setBrands(newBrands) : setBrands(brands)
  }

  const brandsKey = [{ key: 'عنوان', value: 'name' }]

  const sortingHandler = (value) => {
    setActivePage(1)
    const res = keySorting(value, brands, flag)
    setBrands(res['items'])
    setFlag(res['flag'])
  }

  const brandsToShow = paginatedBrands.map((brand) => ({
    ...brand,
    edit: true,
    delete: true,
  }))

  return (
    <>
      <AddButton navigateAddress={`${brandsUrl}/add `} title="برند" />
      {brands.length < 1 ? (
        <Spinner />
      ) : (
        <DataTable
          data={brandsKey}
          flag={flag}
          sortHandler={sortingHandler}
          removeHandler={removeHandle}
          items={brandsToShow}
          editProperty={'_id'}
          editType={brandsUrl}
        />
      )}
      {brands.length > 0 && (
        <PaginationComponent paginate={(e) => paginate(e)} items={brands} activePage={activePage} />
      )}
    </>
  )
}
