/* eslint-disable prettier/prettier */
const getError = (err) => {
  return err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message
}

export { getError }
