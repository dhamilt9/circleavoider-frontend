import { combineReducers } from 'redux'
import gamestate from './gamestate'
import user from './user'
import canvas from './canvas'
import message from './message'

export default combineReducers({
  gamestate,
  user,
  canvas,
  message
})
