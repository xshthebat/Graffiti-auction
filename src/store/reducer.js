// import { combineReducers } from 'redux'
const person = (state = [], action) => {
    switch (action.type) {
        case 'update_person':
            return action.perons
        case 'default':
        console.log('初始化',state);
        return [];
        default:
            return state;
    }
}
const personname = (state = '', action) => {
    switch (action.type) {
        case 'change_name':
            return action.name;
        case 'default':
        return '';
        default:
            return state;
    }
}
const state = (state = 'getready', action) => {
    switch (action.type) {
        case 'game_start':
            return action.state
        case 'default':
        return 'getready';
        default:
            return state
    }
}
const time = (state = '-1',action)=>{
    switch(action.type){
        case 'set_time':
        return action.time
        case 'default':
        return '-1';
        default:
        return state
    }
}
const personindex =(state= -1,action)=>{
    switch(action.type){
        case "set_index":
        return action.index
        case 'default':
        return -1;
        default:
        return state
    }
}
const room = (state = null,action)=>{
    switch(action.type){
        case "set_room":
        return action.room
        case 'default':
        return null;
        default:
        return state
    }
}
const imgs = (state=[],action)=>{
    switch(action.type){
        case "set_imgs":
        return action.imgs
        case 'default':
        return [];
        default:
        return state
    }
}
const imgindex = (state=-1,action)=>{
    switch(action.type){
        case 'set_imgindex':
        return action.index
        case 'default':
        return -1;
        default:
        return state
    }
}
const imgpirce = (state=-1,action)=>{
    switch(action.type){
        case 'set_imgpirce':
        return action.pirce
        case 'default':
        return -1;
        default:
        return state
    }
}
const imggetter = (state='',action)=>{
    switch(action.type){
        case 'set_imggetter':
        return action.person
        case 'default':
        return '';
        default:
        return state
    }
}
const tip = (state={show:false,message:''},action)=>{
    switch(action.type){
        case 'set_tip':
        return action.tip 
        case 'default':
        return {show:false,message:''};
        default:
        return state
    }
}
const propstate = (state=null,action)=>{
    switch(action.type){
        case 'set_propstate':
        return action.state;
        case 'default':
        return null;
        default:
        return state;
    }
}
const propsindex = (state=-1,action)=>{
    switch (action.type) {
        case 'set_propsindex':
        return action.state;
        case 'default':
        return -1;
        default:
        return state;
            
    }
}
export { person, personname, personindex,state ,time,room,imgs,imgindex,imgpirce,imggetter,tip,propstate,propsindex}