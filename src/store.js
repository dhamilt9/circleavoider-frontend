import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import reduxThunk from 'redux-thunk'


const store=createStore(
  rootReducer,
  applyMiddleware(reduxThunk)
)

export default store
