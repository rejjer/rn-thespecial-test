import R from 'ramda'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { feedSelectors, requestFeed } from '../redux/feed'
import { colors, sizes } from '../constants'

class Feed extends Component {
  static propTypes = {
    requestFeed: PropTypes.func,
    userName: PropTypes.string,
    isFetching: PropTypes.bool,
  }

  componentDidMount() {
    this.props.requestFeed(1)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Feed</Text>
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
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
})

const mapStateToProps = R.applySpec({
  feedData: feedSelectors.getData,
  isFetching: feedSelectors.getIsFetching,
  isError: feedSelectors.getIsError,
  nextPage: feedSelectors.getNextPage,
  totalPages: feedSelectors.getTotalPages,
})

const mapDispatchToProps = {
  requestFeed,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed)
