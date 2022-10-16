/* eslint-disable prettier/prettier */

export function commaNumber(number) {
  const strNumber = number.toString()
  strNumber.split()
  const arrayChar = Object.assign([], strNumber)
  const revArray = arrayChar.reverse()
  const theLength = revArray.length
  for (let index = 3; index < theLength; index += 3) {
    let i = index / 3 + index - 1
    revArray.splice(i, 0, ',')
  }
  const newArray = revArray.reverse()
  const newStrNumber = newArray.join('')

  return newStrNumber
}
