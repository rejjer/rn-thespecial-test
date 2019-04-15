import { takeLatest, all, put, call } from 'redux-saga/effects'
import feedManagers from './managers'
import { REQUEST_FEED, feedSuccess, feedReject } from './duck'

function* requestFeedSaga({ payload: page }) {
  const response = yield call(feedManagers.requestFeed, page)
  if (response.data && response.data.status) {
    const {
      data: {
        data: { data, next_page: nextPage, total_pages: totalPages },
      },
    } = response
    yield put(
      feedSuccess({
        data,
        nextPage,
        totalPages,
      }),
    )
  } else {
    yield put(feedReject())
  }
}

export default function*() {
  yield all([takeLatest(REQUEST_FEED, requestFeedSaga)])
}
