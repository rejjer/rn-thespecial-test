import R from 'ramda'
import axios from 'axios'
import RNFastImage from 'react-native-fast-image'

const requestFeed = page => axios.get(`profile/?user_id=71&page=${page || 1}`)

const getColumnsData = data => {
  return data.reduce((result, item, index) => {
    if (index % 3 === 0) {
      result.push([item])
    } else {
      result[result.length - 1].push(item)
    }
    return result
  }, [])
}

const preloadImagesFromData = data => {
  let images = []
  data &&
    data.length &&
    data.forEach(({ look_image }) => {
      if (look_image) {
        images.push({ uri: look_image })
      }
    })
  if (images.length) {
    RNFastImage.preload(images)
  }
}

const mergeDataAndPreloadImages = (mergeData, next) => {
  let dataForImages = []
  if (next && next.length) {
    next.forEach(item => {
      const findIndex = R.findIndex(
        R.propEq('lookimage_id', item.lookimage_id),
        mergeData,
      )
      if (findIndex === -1) {
        mergeData.push(item)
        dataForImages.push(item)
      } else {
        mergeData[findIndex] = item
      }
    })
  }
  preloadImagesFromData(dataForImages)
  return mergeData
}

export default {
  requestFeed,
  getColumnsData,
  preloadImagesFromData,
  mergeDataAndPreloadImages,
}
