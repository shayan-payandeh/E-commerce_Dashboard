/* eslint-disable prettier/prettier */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { api, DefaultPageSize, productsUrl, unit } from 'src/api'
import Spinner from 'src/components/Spinner'
import { pagination } from 'src/functions/pagination'
import PaginationComponent from 'src/components/PaginationComponent'
import persianJs from 'persianjs'
import AddButton from 'src/components/AddButton'
import FilterSelect from 'src/components/FilterSelect'
import DataTable from 'src/components/DataTable'
import keySorting from 'src/functions/keySorting'
import handleRemoving from 'src/functions/handeRemoving'
import { useDispatch, useSelector } from 'react-redux'
import { loadProducts } from 'src/functions/redux/sliceProducts'

export default function Products() {
  const dispatch = useDispatch()

  const [dataStatus, setDataStatus] = useState()
  const [originalProducts, setOriginalProducts] = useState([])
  const [products, setProducts] = useState([])
  const [paginatedProducts, setPaginatedProducts] = useState([])
  const [filterValue, setFilterValue] = useState('All')
  const [flag, setFlag] = useState({})
  const [activePage, setActivePage] = useState(1)
  const pageSize = DefaultPageSize

  const paginate = (activePage) => {
    setActivePage(activePage)
    const paginatedProducts = pagination(activePage, pageSize, products.length, products)
    setPaginatedProducts(paginatedProducts)
  }
  const x = useSelector((state) => state)
  console.log(x)

  useEffect(() => {
    dispatch(loadProducts())
    async function fetchProducts() {
      const result = await axios.get(`${api}${productsUrl}`)
      const products = result.data.map((item) => ({
        ...item,
        price: parseInt(item.price),
        countInStock: parseInt(item.countInStock),
      }))
      setProducts(products)
      setOriginalProducts(products)
      setDataStatus(result.status)
      ///pagination
      const paginatedProducts = pagination(activePage, pageSize, products.length, products)
      setPaginatedProducts(paginatedProducts)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    paginate(activePage)
  }, [activePage, flag, products])

  const removeHandle = (id) => {
    const newProducts = handleRemoving(products, productsUrl, id)
    newProducts.length > 1 ? setProducts(newProducts) : setProducts(products)
  }

  const filterByCategory = ({ target }) => {
    setFilterValue(target.value)
    if (target.value !== 'All') {
      const filteredProducts = originalProducts.filter(
        (product) => product.category === target.value,
      )
      setProducts(filteredProducts)
    } else setProducts(originalProducts)

    if (activePage !== 1) setActivePage(1)
  }

  const selectValues = [
    { value: 'All', name: 'همه' },
    { value: 'Shirts', name: 'پیراهن' },
    { value: 'Pants', name: 'شلوار' },
  ]
  const productKeys = [
    { key: 'نام', value: 'name' },
    { key: 'دسته', value: 'category' },
    { key: 'برند', value: 'brand' },
    { key: 'قیمت', value: 'price' },
    { key: 'تعداد', value: 'countInStock' },
  ]

  const sortingHandler = (value) => {
    setActivePage(1)
    const res = keySorting(value, products, flag)
    setProducts(res['items'])
    setFlag(res['flag'])
  }

  const productsToShow = paginatedProducts.map((product) => ({
    ...product,
    price: persianJs(product.price / 1000).englishNumber()._str + unit,
    countInStock: persianJs(product.countInStock).englishNumber()._str,
    edit: true,
    delete: true,
  }))

  return (
    <>
      <AddButton navigateAddress={`${productsUrl}/add`} title="محصول" />
      <FilterSelect
        values={selectValues}
        filterValue={filterValue}
        filterHandler={filterByCategory}
      />
      {dataStatus !== 200 ? (
        <Spinner />
      ) : (
        <DataTable
          data={productKeys}
          flag={flag}
          sortHandler={sortingHandler}
          items={productsToShow}
          removeHandler={removeHandle}
          editProperty={'slug'}
          editType={productsUrl}
        />
      )}
      {products.length > 0 && (
        <PaginationComponent
          paginate={(e) => paginate(e)}
          items={products}
          activePage={activePage}
        />
      )}
    </>
  )
}
