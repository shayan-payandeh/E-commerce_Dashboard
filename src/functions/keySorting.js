/* eslint-disable prettier/prettier */

const keySorting = (value, array, flag) => {
  const flagKey = value
  let output = {
    items: [],
    flag,
  }
  if (!output.flag[`${flagKey}`] || output.flag[`${flagKey}`] === 'desc') {
    const result = array.sort((a, b) => {
      return a[`${flagKey}`] > b[`${flagKey}`] ? 1 : -1
    })
    output['items'] = result
    output['flag'] = { ...output['flag'], [`${flagKey}`]: 'asc' }
  } else {
    const result = array.sort((a, b) => {
      return b[flagKey] > a[flagKey] ? 1 : -1
    })
    output['items'] = result
    output['flag'] = { ...output['flag'], [`${flagKey}`]: `desc` }
  }
  return output
}

export default keySorting
