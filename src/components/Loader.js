import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { colors } from '../constants'

const FULL_SCREEN = 'full_screen'
const SMALL = 'small'

const Loader = ({ type }) => (
  <ActivityIndicator
    style={type === FULL_SCREEN ? styles.full : styles.small}
    size="small"
  />
)

Loader.propTypes = {
  type: PropTypes.string,
}

Loader.types = {
  FULL_SCREEN,
  SMALL,
}

Loader.defaultProps = {
  type: FULL_SCREEN,
}

const styles = StyleSheet.create({
  full: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.WHITE,
  },
  small: {
    width: '100%',
    height: 100,
    backgroundColor: colors.WHITE,
  },
})

export default Loader
