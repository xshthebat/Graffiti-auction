import { combineReducers } from 'redux'
import { person, personname, personindex,state,time,room,imgs,imgindex,imgpirce,imggetter} from './reducer'
import { createStore,applyMiddleware} from 'redux' //,applyMiddleware
import createLogger from 'redux-logger'
const rootReducer = combineReducers({
    person,
    personname,
    state,
    time,
    personindex,
    room,
    imgs,
    imgindex,
    imgpirce,
    imggetter
})
let store = createStore(rootReducer,applyMiddleware(createLogger));
export default store