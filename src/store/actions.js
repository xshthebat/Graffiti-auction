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