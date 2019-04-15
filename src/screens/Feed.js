import R from 'ramda'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  feedSelectors,
  feedRefreshRequest,
  feedNextRequest,
} from '../redux/feed'
import { colors, sizes } from '../constants'
import Loader from '../components/Loader'
import FullListItem from '../components/FullListItem'
import ColumnListItem from '../components/ColumnListItem'

const FEED_LIST = 'list'
const FEED_COLUMNS = 'columns'

class Feed extends Component {
  static propTypes = {
    feedRefreshRequest: PropTypes.func,
    feedNextRequest: PropTypes.func,
    feedData: PropTypes.array,
    feedColumnsData: PropTypes.array,
    refreshIsFetching: PropTypes.bool,
    nextIsFetching: PropTypes.bool,
    isError: PropTypes.bool,
    nextPage: PropTypes.number,
    totalPages: PropTypes.number,
  }

  state = {
    feedType: FEED_LIST,
  }

  componentDidMount() {
    this.props.feedRefreshRequest()
  }

  _renderItem = ({ item }) => {
    const { feedType } = this.state
    if (feedType === FEED_LIST) {
      const {
        profile_image = '',
        username = '',
        published_time = '',
        look_image = '',
      } = item
      return (
        <FullListItem
          userName={username}
          publishedTime={published_time}
          userImage={profile_image}
          lookImage={look_image}
        />
      )
    } else {
      return (
        <View style={styles.row}>
          {item.map(({ look_image = '' }, index) => {
            return <ColumnListItem key={index} lookImage={look_image} />
          })}
        </View>
      )
    }
  }

  _keyExtractor = ({ lookimage_id = 0 }, index) => `${lookimage_id}_${index}`

  _refreshFeed = () => {
    this.props.feedRefreshRequest()
  }

  _onPressControl = feedType => {
    if (this.state.feedType !== feedType) {
      this.setState({
        feedType,
      })
    }
  }

  _onPressControlList = () => this._onPressControl(FEED_LIST)

  _onPressControlColumns = () => this._onPressControl(FEED_COLUMNS)

  _onEndReached = () => {
    const {
      refreshIsFetching,
      nextIsFetching,
      nextPage,
      feedNextRequest,
    } = this.props
    if (!refreshIsFetching && !nextIsFetching && !!nextPage) {
      feedNextRequest(nextPage)
    }
  }

  _renderFooter = () => {
    if (this.props.nextIsFetching) {
      return <Loader type={Loader.types.SMALL} />
    } else {
      return null
    }
  }

  render() {
    const { feedData, feedColumnsData, refreshIsFetching } = this.props
    const { feedType } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.control}
            onPress={this._onPressControlList}
          >
            <Text
              style={[
                styles.controlText,
                feedType === FEED_LIST && styles.controlTextActive,
              ]}
            >
              {FEED_LIST}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.control}
            onPress={this._onPressControlColumns}
          >
            <Text
              style={[
                styles.controlText,
                feedType === FEED_COLUMNS && styles.controlTextActive,
              ]}
            >
              {FEED_COLUMNS}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          onRefresh={this._refreshFeed}
          refreshing={refreshIsFetching}
          data={feedType === FEED_LIST ? feedData : feedColumnsData}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this._renderFooter()}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={2}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingTop: sizes.STATUSBAR_HEIGHT,
  },
  row: {
    flexDirection: 'row',
  },
  control: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  controlText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.GRAY,
  },
  controlTextActive: {
    color: colors.PINK,
  },
})

const mapStateToProps = R.applySpec({
  feedData: feedSelectors.getData,
  feedColumnsData: feedSelectors.getColumnsData,
  refreshIsFetching: feedSelectors.getRefreshIsFetching,
  nextIsFetching: feedSelectors.getNextIsFetching,
  isError: feedSelectors.getIsError,
  nextPage: feedSelectors.getNextPage,
  totalPages: feedSelectors.getTotalPages,
})

const mapDispatchToProps = {
  feedRefreshRequest,
  feedNextRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed)
