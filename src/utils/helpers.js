import R from 'ramda'
import { names } from '../constants'

export const getModuleActionName = R.curry(
  (moduleName, actionName) => `${names.APP_NAME}/${moduleName}/${actionName}`,
)
