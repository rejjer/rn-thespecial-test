import R from 'ramda'

const getState = R.prop('feed')

const getIsFetching = R.pipe(
  getState,
  R.prop('isFetching'),
)

const getIsError = R.pipe(
  getState,
  R.prop('isError'),
)

const getData = R.pipe(
  getState,
  R.prop('data'),
)

const getNextPage = R.pipe(
  getState,
  R.prop('nextPage'),
)

const getTotalPages = R.pipe(
  getState,
  R.prop('totalPages'),
)

export default {
  getIsFetching,
  getIsError,
  getData,
  getNextPage,
  getTotalPages,
}
