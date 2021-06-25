import { combineReducers } from 'redux'
import imageReducer from './imageReducer'
import web3Reducer from './web3Reducer'

export default combineReducers({
    web3: web3Reducer,
    image: imageReducer,
})