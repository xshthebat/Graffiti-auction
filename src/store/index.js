import { combineReducers } from 'redux'
import { person, personname, state } from './reducer'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
const rootReducer = combineReducers({
    person,
    personname,
    state
})
let store = createStore(rootReducer, applyMiddleware(createLogger));

export default store