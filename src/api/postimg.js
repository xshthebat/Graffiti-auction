import axios from 'axios';
import host from '../common/host';
export default function postimg(blobs,rooms,usrname) {
    console.log(blobs[0],blobs[1]);
    let fromData = new FormData();
    fromData.append("img1", blobs[0]);
    fromData.append("img2",blobs[1]);
    let url = `http://${host}:8881/postimg?rooms=${rooms}&num=${usrname}`
    return axios.post(url, fromData, {
        headers: {
            'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata
        }
    })
}