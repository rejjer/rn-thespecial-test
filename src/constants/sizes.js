import { Dimensions, Platform } from 'react-native'

const D = Dimensions.get('window')

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? !Platform.isPad &&
      !Platform.isTVOS &&
      (D.height === 812 ||
        D.width === 812 ||
        (D.height === 896 || D.width === 896))
      ? 44
      : 20
    : 0

export const WINDOW_WIDTH = D.width
