import { combineReducers } from 'redux'
import { person, personname, personindex,state,time} from './reducer'
import { createStore} from 'redux'
// , applyMiddleware 
// import createLogger from 'redux-logger'
const rootReducer = combineReducers({
    person,
    personname,
    state,
    time,
    personindex
})
let store = createStore(rootReducer);
// applyMiddleware(createLogger)
export default store