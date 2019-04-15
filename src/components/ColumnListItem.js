import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import RNFastImage from 'react-native-fast-image'
import { sizes } from '../constants'

const FullListItem = ({ lookImage }) => (
  <View style={styles.container}>
    <RNFastImage
      source={{ uri: lookImage }}
      style={styles.lookImage}
      resizeMode="cover"
    />
  </View>
)

FullListItem.propTypes = {
  userName: PropTypes.string,
  publishedTime: PropTypes.string,
  userImage: PropTypes.string,
  lookImage: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {},
  lookImage: {
    width: sizes.WINDOW_WIDTH / 3,
    height: sizes.WINDOW_WIDTH / 3,
  },
})

export default FullListItem
