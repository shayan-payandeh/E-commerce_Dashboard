/* eslint-disable prettier/prettier */

export function pagination(pageNumber, pageSize, totalItemsLength, toPaginateItems) {
  const min = (pageNumber - 1) * pageSize
  let itemsToPaginate = []
  if (pageNumber * pageSize <= totalItemsLength) {
    const max = pageNumber * pageSize - 1
    itemsToPaginate = toPaginateItems.slice(min, max + 1)
  } else if (pageNumber * pageSize > totalItemsLength) {
    const max = totalItemsLength - 1
    itemsToPaginate = toPaginateItems.slice(min, max + 1)
  }

  return itemsToPaginate
}
