import R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { getModuleActionName } from '../../utils/helpers'

/* #region Action Types */

const getActionName = getModuleActionName('feed')

export const FEED_REFRESH_REQUEST = getActionName('FEED_REFRESH_REQUEST')
export const FEED_REFRESH_SUCCESS = getActionName('FEED_REFRESH_SUCCESS')
export const FEED_REFRESH_REJECT = getActionName('FEED_REFRESH_REJECT')

export const FEED_NEXT_REQUEST = getActionName('FEED_NEXT_REQUEST')
export const FEED_NEXT_SUCCESS = getActionName('FEED_NEXT_SUCCESS')
export const FEED_NEXT_REJECT = getActionName('FEED_NEXT_REJECT')

/* #endregion */

/* #region Action Creators */

export const feedRefreshRequest = createAction(FEED_REFRESH_REQUEST)
export const feedRefreshSuccess = createAction(FEED_REFRESH_SUCCESS)
export const feedRefreshReject = createAction(FEED_REFRESH_REJECT)

export const feedNextRequest = createAction(FEED_NEXT_REQUEST)
export const feedNextSuccess = createAction(FEED_NEXT_SUCCESS)
export const feedNextReject = createAction(FEED_NEXT_REJECT)

/* #endregion */

/* #region reducers */

const feed = handleActions(
  {
    [FEED_REFRESH_REQUEST]: state => ({
      ...state,
      nextIsFetching: false,
      refreshIsFetching: true,
    }),
    [FEED_REFRESH_SUCCESS]: R.useWith(
      (state, { data, columnsData, nextPage, totalPages }) => {
        return {
          ...state,
          data,
          columnsData,
          nextPage,
          totalPages,
          refreshIsFetching: false,
          isError: false,
        }
      },
      [R.identity, R.path(['payload'])],
    ),
    [FEED_REFRESH_REJECT]: state => ({
      ...state,
      refreshIsFetching: false,
      isError: true,
    }),
    [FEED_NEXT_REQUEST]: state => ({
      ...state,
      nextIsFetching: true,
    }),
    [FEED_NEXT_SUCCESS]: R.useWith(
      (state, { data, columnsData, nextPage, totalPages }) => {
        return {
          ...state,
          data,
          columnsData,
          nextPage,
          totalPages,
          nextIsFetching: false,
          isError: false,
        }
      },
      [R.identity, R.path(['payload'])],
    ),
    [FEED_NEXT_REJECT]: state => ({
      ...state,
      nextIsFetching: false,
      isError: true,
    }),
  },
  {
    data: [],
    columnsData: [],
    nextPage: 0,
    totalPages: 0,
    refreshIsFetching: false,
    nextIsFetching: false,
    isError: false,
  },
)

/* #endregion */

export default feed
