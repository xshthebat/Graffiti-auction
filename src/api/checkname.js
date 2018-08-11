import axios from 'axios';


export default function checkname(name) {
    console.log(' get', name);
    let url = 'http://localhost:8881/getsoketname'
    return axios.get(url, {
        params: {
            name: name
        }
    })
}