import { combineReducers } from 'redux'
import gamestate from './gamestate'
import user from './user'
import canvas from './canvas'

export default combineReducers({
  gamestate,
  user,
  canvas
})
