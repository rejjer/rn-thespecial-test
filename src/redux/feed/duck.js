import R from 'ramda'
import { createAction, handleActions } from 'redux-actions'
import { getModuleActionName } from '../../utils/helpers'

/* #region Action Types */

const getActionName = getModuleActionName('feed')

export const REQUEST_FEED = getActionName('REQUEST_FEED')
export const FEED_SUCCESS = getActionName('FEED_SUCCESS')

export const FEED_REJECT = getActionName('FEED_REJECT')
export const LOGOUT_SUCCESS = getActionName('LOGOUT_SUCCESS')

/* #endregion */

/* #region Action Creators */

export const requestFeed = createAction(REQUEST_FEED)
export const feedSuccess = createAction(FEED_SUCCESS)
export const feedReject = createAction(FEED_REJECT)

/* #endregion */

/* #region reducers */

const feed = handleActions(
  {
    [REQUEST_FEED]: state => ({ ...state, isFetching: true, isError: false }),
    [FEED_SUCCESS]: R.useWith(
      (state, { data, nextPage, totalPages }) => {
        return {
          ...state,
          data,
          nextPage,
          totalPages,
          isFetching: false,
        }
      },
      [R.identity, R.path(['payload'])],
    ),
    [FEED_REJECT]: state => ({ ...state, isFetching: false, isError: true }),
  },
  {
    data: null,
    nextPage: 0,
    totalPages: 0,
    isFetching: false,
    isError: false,
  },
)

/* #endregion */

export default feed
