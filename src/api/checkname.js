import axios from 'axios';
import host from '../common/host';
export default function checkname(name) {
    console.log(' get', name);
    let url = `http://${host}:8881/getsoketname`
    return axios.get(url, {
        params: {
            name: name
        }
    })
}