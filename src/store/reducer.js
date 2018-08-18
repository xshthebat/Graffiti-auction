// import { combineReducers } from 'redux'

const person = (state = [], action) => {
    switch (action.type) {
        case 'update_person':
            return action.perons
        default:
            return state;
    }
}
const personname = (state = '', action) => {
    switch (action.type) {
        case 'change_name':
            return action.name;
        default:
            return state;
    }
}
const state = (state = 'getready', action) => {
    switch (action.type) {
        case 'game_start':
            return action.state
        default:
            return state
    }
}
const time = (state = '-1',action)=>{
    switch(action.type){
        case 'set_time':
        return action.time
        default:
        return state
    }
}
const personindex =(state= -1,action)=>{
    switch(action.type){
        case "set_index":
        return action.index
        default:
        return state
    }
}
export { person, personname, personindex,state ,time}