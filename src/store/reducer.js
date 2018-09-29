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
const room = (state = null,action)=>{
    switch(action.type){
        case "set_room":
        return action.room
        default:
        return state
    }
}
const imgs = (state=[],action)=>{
    switch(action.type){
        case "set_imgs":
        return action.imgs
        default:
        return state
    }
}
const imgindex = (state=-1,action)=>{
    switch(action.type){
        case 'set_imgindex':
        return action.index
        default:
        return state
    }
}
const imgpirce = (state=-1,action)=>{
    switch(action.type){
        case 'set_imgpirce':
        return action.pirce
        default:
        return state
    }
}
const imggetter = (state='',action)=>{
    switch(action.type){
        case 'set_imggetter':
        return action.person
        default:
        return state
    }
}
export { person, personname, personindex,state ,time,room,imgs,imgindex,imgpirce,imggetter}