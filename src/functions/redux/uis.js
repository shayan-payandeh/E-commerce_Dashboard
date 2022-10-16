/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux'
import sliceHamburger from './sliceHamburger'
import sliceLanguage from './sliceLanguage'

export default combineReducers({
  hamburger: sliceHamburger,
  language: sliceLanguage,
})
