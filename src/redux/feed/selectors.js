import R from 'ramda'

const getState = R.prop('feed')

const getRefreshIsFetching = R.pipe(
  getState,
  R.prop('refreshIsFetching'),
)

const getNextIsFetching = R.pipe(
  getState,
  R.prop('nextIsFetching'),
)

const getIsError = R.pipe(
  getState,
  R.prop('isError'),
)

const getData = R.pipe(
  getState,
  R.prop('data'),
)
const getColumnsData = R.pipe(
  getState,
  R.prop('columnsData'),
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
  getRefreshIsFetching,
  getNextIsFetching,
  getIsError,
  getData,
  getColumnsData,
  getNextPage,
  getTotalPages,
}
