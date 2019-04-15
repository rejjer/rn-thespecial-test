import { takeLatest, all, put, call, select } from 'redux-saga/effects'
import feedManagers from './managers'
import {
  FEED_REFRESH_REQUEST,
  feedRefreshSuccess,
  feedRefreshReject,
  FEED_NEXT_REQUEST,
  feedNextSuccess,
  feedNextReject,
} from './duck'
import feedSelectors from './selectors'

function* feedRefreshSaga() {
  const response = yield call(feedManagers.requestFeed, 1)
  if (response.data && response.data.status) {
    const {
      data: {
        data: { data, next_page: nextPage, total_pages: totalPages },
      },
    } = response
    feedManagers.preloadImagesFromData(data)
    const columnsData = feedManagers.getColumnsData(data)
    yield put(
      feedRefreshSuccess({
        data,
        columnsData,
        nextPage,
        totalPages,
      }),
    )
  } else {
    yield put(feedRefreshReject())
  }
}

function* feedNextSaga({ payload: page }) {
  const response = yield call(feedManagers.requestFeed, page)
  if (response.data && response.data.status) {
    const {
      data: {
        data: { data, next_page: nextPage, total_pages: totalPages },
      },
    } = response
    let mergeData = yield select(feedSelectors.getData)
    mergeData = feedManagers.mergeDataAndPreloadImages(mergeData, data)
    const columnsData = feedManagers.getColumnsData(mergeData)
    yield put(
      feedNextSuccess({
        data: mergeData,
        columnsData,
        nextPage,
        totalPages,
      }),
    )
  } else {
    yield put(feedNextReject())
  }
}

export default function*() {
  yield all([takeLatest(FEED_REFRESH_REQUEST, feedRefreshSaga)])
  yield all([takeLatest(FEED_NEXT_REQUEST, feedNextSaga)])
}
