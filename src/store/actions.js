export const changePersonstate = (state) => {
    return {
        type: 'change_person_state',
        state: state
    }
}
export const updataperson = (person) => {
    return {
        type: 'update_person',
        perons: person
    }
}
export const changename = (name) => {
    return {
        type: 'change_name',
        name: name
    }
}
export const gamestart = (state) => {
    return {
        type: 'game_start',
        state: state
    }
}
export const reset = (time)=>{
    return {
        type:'default',
        time:time
    }
}
export const setime = (time)=>{
    return {
        type:'set_time',
        time:time
    }
}
export const setindex = (index)=>{
    return {
        type:'set_index',
        index:index
    }
}
export const setroom = (room)=>{
    return {
        type:'set_room',
        room:room
    }
}
export const setimgs = (imgs)=>{
    return {
        type:'set_imgs',
        imgs:imgs
    }
}
export const setimgindex  = (index)=>{
    return {
        type:'set_imgindex',
        index:index
    }
}
export const setimgpirce = (pirce)=>{
    return {
        type:'set_imgpirce',
        pirce:pirce
    }
}
export const setgetters = (person)=>{
    return {
        type:'set_imggetter',
        person:person
    }
}
export const settip = (tip)=>{
    return {
        type:'set_tip',
        tip:tip
    }
}