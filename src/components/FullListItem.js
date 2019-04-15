import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import RNFastImage from 'react-native-fast-image'
import { colors, sizes } from '../constants'

const FullListItem = ({ userName, publishedTime, userImage, lookImage }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        <RNFastImage
          source={{ uri: userImage }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.userName} numberOfLines={1}>
          {userName}
        </Text>
        <Text style={styles.publishedTime} numberOfLines={1}>
          {publishedTime}
        </Text>
      </View>
    </View>
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
  container: {
    alignItems: 'flex-start',
    paddingTop: 16,
  },
  header: {
    padding: 8,
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: colors.PINK,
    borderWidth: 2,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: 20,
  },
  infoContainer: {
    paddingLeft: 8,
    flexGrow: 1,
    width: 0,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.BLACK,
  },
  publishedTime: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.GRAY,
  },
  lookImage: {
    width: sizes.WINDOW_WIDTH,
    height: sizes.WINDOW_WIDTH,
  },
})

export default FullListItem
