/* eslint-disable prettier/prettier */
import persianJs from 'persianjs'

const numberToPersian = (number) => {
  const x = number === '0' || number === 0 ? '-' : persianJs(number).englishNumber()._str
  return x
}

export default numberToPersian
